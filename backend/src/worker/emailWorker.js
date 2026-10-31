import { Worker } from 'bullmq';
import { sendDynamicEmail } from '../services/emailService.js';
import process from 'process';

const redisOptions = {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
};

const emailWorker = new Worker('EmailQueue', async (job) => {
    const { toEmail, subject, templateName, templateData } = job.data;
console.log(job,"jobbbbbb");

    console.log(`[Worker] 🛠️  Processing job #${job.id} | Template: "${templateName}" to: ${toEmail}`);

    try {
      const result =  await sendDynamicEmail(toEmail, subject, templateName, templateData);
        console.log(`[Worker] ${result}✅ Job #${job.id} processed successfully.`);
    } catch (error) {
        console.error(`[Worker] ❌ Error handling job #${job.id}:`, error.message);
        throw error; 
    }
}, { 
    connection: redisOptions,
    // 🚀 OPTIMIZATION 1: Bump concurrency to 25 or 30.
    // Since sending emails is an asynchronous network-bound (I/O) task, 
    // Node.js can easily track 30 outgoing network requests at the exact same time.
    concurrency: 30,

    // 🚀 OPTIMIZATION 2: Change the polling lock duration.
    // If an email process takes longer than expected due to external mail server lag,
    // this ensures BullMQ doesn't think the worker died and attempt to re-assign it.
    lockDuration: 30000, // 30 seconds max execution security line
});

// Global event listeners
emailWorker.on('completed', (job) => {
    console.log(`[Worker Event] Job ${job.id} has completed safely.`);
});

emailWorker.on('failed', (job, err) => {
    console.error(`[Worker Event] Job ${job.id} permanently failed or waiting for retry. Error: ${err.message}`);
});

export default emailWorker;
