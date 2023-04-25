import nodemailer from 'nodemailer'

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            logger: true,
            debug: true,
            secureConnection: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }
    
    async sendActivationMail(userEmail, activationLink) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to: userEmail,
            subject: `Account activation on ${process.env.SERVER_URL}`,
            html: `
                <div>
                    <h1>To activate, follow the link</h1>
                    <a href="${activationLink}">${activationLink}</a>
                </div>
            `
        });
    }
}

export default new MailService();