const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ACCOUNT_USER, // generated ethereal user
        pass: process.env.EMAIL_ACCOUNT_PASS, // generated ethereal password
    },
});

module.exports = {
    transporter
}