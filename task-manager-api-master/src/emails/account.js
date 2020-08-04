const mail = require('@sendgrid/mail');

mail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    mail.send({
        to: email,
        from: 'emmanuel@taskapp.io',
        subject: 'Thanks for joining in!',
        text: `
            Welcome to the app, ${name}. Let me know how you get along
            with the app.
        `
    });
};

const sendCancelationEmail = (email, name) => {
    mail.send({
        to: email,
        from: 'emmanuel@taskapp.io',
        subject: 'Sorry to see you go!',
        text: `
            Goodbye, ${name}. I hope to see you back sometime soon.
        `   
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
};
