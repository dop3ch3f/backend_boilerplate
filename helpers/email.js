const nodemailer = require('nodemailer');
const striptags = require('striptags');

const emailConfig = {
  smtpConfig: {
    service: 'gmail',
    auth: {
      user: process.env.emailUserName,
      pass: process.env.emailPassword,
    },
  },
};

module.exports = {
  // attachments = array of object attachments. more info: https://nodemailer.com/using-attachments/
  send(recipientEmail, subject, htmlmessage, attachments) {
    const mailtransporter = nodemailer.createTransport(emailConfig.smtpConfig);

    const mailOptions = {
      from: '', // sender address
      to: recipientEmail, // list of receivers
      subject, // Subject line
      text: striptags(htmlmessage), // plaintext body
    };

    if (attachments) {
      mailOptions.attachments = attachments;
    }

    // send mail with defined transport object
    mailtransporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(`***MAIL*** Problem sending mail ${error}`);
        return;
      }
      console.log(`***MAIL*** Message sent: ${info.response}`);
    });
  },
};
