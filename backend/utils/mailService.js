import nodemailer from 'nodemailer';

export const sendAlertEmail = async (alertMessage) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ALERT_EMAIL_RECIPIENT,
        subject: 'Weather Alert',
        text: alertMessage,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Alert email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
