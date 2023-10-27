import nodeMailer from 'nodemailer';

export const transporter = nodeMailer.createTransport({
    service: 'Gmail',
    host: 'localhost',
    port: 465,
    secure: true,

    auth: {
      user: "johnkristan01@gmail.com",
      pass: "bkzd cgbb wywn qmvi",
      
    },
});
