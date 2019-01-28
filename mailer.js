// const nodemailer = require('nodemailer');

// const EMAIL_HOST = require('./config/keys').EMAIL_HOST;
// const EMAIL_PORT = require('./config/keys').EMAIL_PORT;
// const EMAIL_USER = require('./config/keys').EMAIL_USER;
// const EMAIL_PASS = require('./config/keys').EMAIL_PASS;

// const from = '"Bookworm" <info@bookworm.com>';

// function setup() {
//   return nodemailer.createTransport({
//     host: 'smtp.mailtrap.io',
//     port: '2525',
//     auth: {
//       user: '4ea2bf03e489eb',
//       pass: '1ad4cde3a08870'
//     }
//   });
// }

// module.exports = function sendConfirmationEmail(user) {
//   const tranport = setup();
//   const email = {
//     from,
//     to: user.email,
//     subject: "Welcome to Bookworm",
//     text: `
//     Welcome to Bookworm. Please, confirm your email.

//     ${user.generateConfirmationUrl()}
//     `
//   };

//   tranport.sendMail(email);
// }

// module.exports = function sendResetPasswordEmail(user) {
//   const tranport = setup();
//   const email = {
//     from,
//     to: user.email,
//     subject: "Reset Password",
//     text: `
//     To reset password follow this link

//     ${user.generateResetPasswordLink()}
//     `
//   };

//   tranport.sendMail(email);
// }