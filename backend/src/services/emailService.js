import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
  import process from 'process';
 import { sendEmail } from '../utils/sendEmail.js';

/**
 * In-memory cache to store compiled Handlebars template functions.
 * Keys will be template names (e.g., 'welcome'), values will be the compiler function.
 */
const templateCache = {};

/**
 * Core Service to dynamically compile and send emails.
 * 
 * @param {string} toEmail - The recipient's email address.
 * @param {string} subject - The subject line of the email.
 * @param {string} templateName - The filename of the template (without .html extension).
 * @param {Object} templateData - Key-value pairs matching the variables inside the HTML template.
 */
export const sendDynamicEmail = async (toEmail, subject, templateName, templateData) => {
    try {
        // Step 1: Check if the template function is already sitting in RAM cache
        let compiledTemplate = templateCache[templateName];

        // Step 2: Cache Miss - If it's not cached, go get it from the hard drive
        if (!compiledTemplate) {
            console.log(`[Cache Miss] Loading template "${templateName}" from hard drive...`);
            
            // Build absolute path starting from your project root folder
            const templatePath = path.join(process.cwd(), 'src', 'template', `${templateName}.html`);
            
            // Safety Check: Avoid crash if someone requested a template that doesn't exist
            if (!fs.existsSync(templatePath)) {
                throw new Error(`Email template file not found at path: ${templatePath}`);
            }

            // Read the template file raw contents as text
            const templateSource = fs.readFileSync(templatePath, 'utf8');
            
            // Compile the raw text string into a dynamic executable JavaScript function
            compiledTemplate = handlebars.compile(templateSource);
            
            // Store it in the cache object so we never have to read this file from disk again
            templateCache[templateName] = compiledTemplate;
        } else {
            console.log(`[Cache Hit] Using pre-compiled template "${templateName}" from memory.`);
        }

        // Step 3: Inject variables into the HTML layout template
        const htmlBody = compiledTemplate(templateData);
console.log(htmlBody,"htmlbody");

        // Step 4: Assemble the final package for the email transport provider
        const mailOptions = {
             subject: subject,
            html: htmlBody,
             to: toEmail,
        };

        // Step 5: Ship it out over the network using your Nodemailer/API transport configuration
        const deliveryResult = await sendEmail(mailOptions)
           console.log(deliveryResult,"result");
           
        console.log(`Email successfully delivered via queue to ${toEmail}. MessageID: ${deliveryResult.messageId}`);
        return deliveryResult;

    } catch (error) {
        console.error(`🚨 [Email Service Error] Failed to process template "${templateName}":`, error.message);
        // Throwing the error upward allows the Queue Worker to catch it and mark the job as "failed" for retrying.
        throw error; 
    }
};
