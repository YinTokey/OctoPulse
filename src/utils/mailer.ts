// pages/api/sendEmail.ts

// import formData from 'form-data';
// import Mailgun from "mailgun.js";
import { NodeMailgun } from 'ts-mailgun';

// Initialize the Mailgun client using form-data
// const mailgun = new Mailgun(formData);
// const mg = mailgun.client({
//     username: 'api',
//     key: process.env.MAILGUN_API_KEY as string,
// });
const mailer = new NodeMailgun();
mailer.apiKey = process.env.MAILGUN_API_KEY as string
mailer.domain = process.env.MAILGUN_DOMAIN as string;
mailer.fromEmail = process.env.MAILGUN_FROM as string || 'mailgun@' + mailer.domain; //
mailer.fromTitle = 'Weekly report'; //
mailer.init();

export async function sendEmail(to: string, subject: string, html: string) {
    const sendOptions = {
        from: `Weekly Report <mailgun@${mailer.domain}>`,
        text: 'Please view the report in HTML compatible email clients.',
        "h:List-Unsubscribe": `<https://${mailer.domain}/unsubscribe?email=${to}>`
    };

    // ts-mailgun send signature: send(to, subject, body, templateVars?, sendOptions?)
    return mailer.send(to, subject, html, {}, sendOptions);
}