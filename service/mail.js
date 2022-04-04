


const nodemailer = require('nodemailer');
  


module.exports = {
    sendMail: async(mailTo, mailSubject, mailText) => {
        const mailTransporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        });
        const mailInfo = await mailTransporter.sendMail({
            from: process.env.mailFrom,
            to: mailTo,
            subject: mailSubject,
            text: mailText
        })
        if((process.env.NODE_ENV || 'development') == 'development') return nodemailer.getTestMessageUrl(mailInfo)
    }
}