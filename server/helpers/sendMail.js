"use strict";
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "samrush0099@gmail.com",
        pass: "geenwfktywtnvsgl",
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, subject, text, html) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: 'samrush0099@gmail.com', // sender address
        to,
        subject,
        text,
        html
    });

}


module.exports = { sendMail }
