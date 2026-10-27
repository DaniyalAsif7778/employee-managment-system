// let forgetpassword = `<!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Reset Your Password</title>
// </head>
// <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
//   <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f6f8; padding: 40px 20px;">
//     <tr>
//       <td align="center">
//         <!-- Card Container -->
//         <table width="100%" max-width="500px" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; max-width: 500px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 32px;">
          
//           <!-- App Header -->
//           <tr>
//             <td align="center" style="padding-bottom: 24px; border-bottom: 1px solid #eaeaea;">
//               <h2 style="margin: 0; color: #111111; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">EMS Portal</h2>
//             </td>
//           </tr>

//           <!-- Content Body -->
//           <tr>
//             <td style="padding: 32px 0 24px 0;">
//               <p style="margin: 0 0 16px 0; color: #444444; font-size: 16px; line-height: 1.5;">Hello,</p>
//               <p style="margin: 0 0 24px 0; color: #444444; font-size: 16px; line-height: 1.5;">We received a request to reset your password. Use the verification code below to proceed. This code is short-lived and will expire soon.</p>
              
//               <!-- OTP Box -->
//               <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f3f5; border-radius: 6px; margin-bottom: 24px;">
//                 <tr>
//                   <td align="center" style="padding: 16px; font-family: monospace; font-size: 32px; font-weight: 700; color: #0070f3; letter-spacing: 4px;">
//                     {{otp_code}}
//                   </td>
//                 </tr>
//               </table>

//               <p style="margin: 0; color: #666666; font-size: 14px; line-height: 1.5;">If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
//             </td>
//           </tr>

//           <!-- Footer -->
//           <tr>
//             <td align="center" style="padding-top: 24px; border-top: 1px solid #eaeaea; color: #888888; font-size: 12px;">
//               <p style="margin: 0;">This is an automated security transmission from your EMS Platform.</p>
//             </td>
//           </tr>

//         </table>
//       </td>
//     </tr>
//   </table>
// </body>
// </html>

// `;
// let inviteemployee = ` 
// <!DOCTYPE html>
// <html>
// <head>
//   <meta charset="utf-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Join the Organization</title>
// </head>
// <body style="margin: 0; padding: 0; background-color: #f4f6f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
//   <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f6f8; padding: 40px 20px;">
//     <tr>
//       <td align="center">
//         <!-- Card Container -->
//         <table width="100%" max-width="500px" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; max-width: 500px; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); padding: 32px;">
          
//           <!-- App Header -->
//           <tr>
//             <td align="center" style="padding-bottom: 24px; border-bottom: 1px solid #eaeaea;">
//               <h2 style="margin: 0; color: #111111; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">EMS Portal</h2>
//             </td>
//           </tr>

//           <!-- Content Body -->
//           <tr>
//             <td style="padding: 32px 0 24px 0;">
//               <p style="margin: 0 0 16px 0; color: #111111; font-size: 18px; font-weight: 600;">Welcome, {{fullName}}!</p>
//               <p style="margin: 0 0 16px 0; color: #444444; font-size: 16px; line-height: 1.5;">An organization administrator has invited you to join the team platform as an active <strong>{{role}}</strong>.</p>
//               <p style="margin: 0 0 24px 0; color: #444444; font-size: 16px; line-height: 1.5;">Click the secure verification button below to set up your account password and activate your workspace profile:</p>
              
//               <!-- Call to Action Button -->
//               <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 24px;">
//                 <tr>
//                   <td align="center">
//                     <a href="{{frontendUrl}}/accept-invite?token={{token}}" target="_blank" style="background-color: #0070f3; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 16px; font-weight: 600; border-radius: 6px; display: inline-block;">
//                       Accept Workplace Invitation
//                     </a>
//                   </td>
//                 </tr>
//               </table>

//               <p style="margin: 0; color: #666666; font-size: 13px; line-height: 1.5;"><em>Note: This single-use link is secure and will remain valid until {{expiresAt}}.</em></p>
//             </td>
//           </tr>

//           <!-- Footer -->
//           <tr>
//             <td align="center" style="padding-top: 24px; border-top: 1px solid #eaeaea; color: #888888; font-size: 12px;">
//               <p style="margin: 0 0 4px 0;">If you think this invitation was sent in error, please contact your company manager.</p>
//             </td>
//           </tr>

//         </table>
//       </td>
//     </tr>
//   </table>
// </body>
// </html>

// `
// const template = {
//   ForgetPassword: forgetpassword,
//   EmployeeInvite:inviteemployee,
// };


// const getTemplate = (templateName) => {

// }