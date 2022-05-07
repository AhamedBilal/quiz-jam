const nodemailer = require('nodemailer');
const config = require('../config/general.config');
// const transporter = nodemailer.createTransport({
//     service: config.MAIL_SERVICE,
//     auth: {
//         user: config.MAIL_USER,
//         pass: config.MAIL_PASSWORD
//     }
// });


exports.sendTextEmail = async (to, subject, text) => {

    let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    const mailOptions = {
        from: config.MAIL_FROM,
        to,
        subject,
        text
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

exports.sendHtmlEmail = async (to, subject, html) => {

    let testAccount = await nodemailer.createTestAccount();

// create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
        },
    });

    const mailOptions = {
        from: config.MAIL_FROM,
        to,
        subject,
        html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

