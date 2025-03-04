// pages/api/sendEmail.ts

import formData from 'form-data';
import Mailgun from "mailgun.js";

// Initialize the Mailgun client using form-data
const mailgun = new Mailgun(formData);
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY as string,
});

const domain = process.env.MAILGUN_DOMAIN as string; // e.g., 'yourdomain.com'

export async function sendEmail(to: string, subject: string, html: string) {
    const messageData = {
        from: `Weekly Report <mailgun@${domain}>`,
        to: [to],
        subject,
        text: 'Please view the report in HTML compatible email clients.',
        html,
        "h:List-Unsubscribe": `<https://${process.env.MAILGUN_DOMAIN}/unsubscribe?email=${to}`
    };

    return mg.messages.create(domain, messageData);
}