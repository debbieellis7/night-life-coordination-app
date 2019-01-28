const nodemailer = require('nodemailer');

const EMAIL_HOST = require('../config/keys').EMAIL_HOST;
const EMAIL_PORT = require('../config/keys').EMAIL_PORT;
const EMAIL_USER = require('../config/keys').EMAIL_USER;
const EMAIL_PASS = require('../config/keys').EMAIL_PASS;

const from = '"Night-Life-Coordination App" <info@night-life-coordination.com>';

function setup() {
  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });
}

module.exports = function sendResetPasswordEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Reset Password - Night-Life-Coordination App",
    text: `To reset password follow this link

    ${user.generateResetPasswordLink()}`
  };

  tranport.sendMail(email);
}