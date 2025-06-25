import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD
    }
});
const sendEmail = async (from, to, subject, text, html) => {
    transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
    }, (err) => {
        if (err)
            res.status(500).json({ message: err })
        else {
            transporter.close();
            res.status(200).json({ message: "ok" })
        }
    });
}
export { sendEmail }