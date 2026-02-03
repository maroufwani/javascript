const nodemailer=require('nodemailer');
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_APP_PASSWORD
    }
})
const emailService={
    send: async (to, subject, body)=>{
        const emailOptions={
            from: process.env.GOOGLE_EMAIL,
            to: to,
            subject: subject,
            text: body
        };
        await transporter.sendMail(emailOptions);
    },
}
module.exports=emailService;