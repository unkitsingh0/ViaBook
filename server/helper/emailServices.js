import nodemailer from "nodemailer";

// NodeMailer code
let handelEmailService = (userEmail, subject, text) => {
  let mailTrasnporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "viabooking.suport@gmail.com",
      pass: process.env.EMAIL_TOKEN,
    },
  });

  let details = {
    from: "viabooking.suport@gmail.com",
    to: userEmail,
    subject: subject,
    text: text,
  };

  mailTrasnporter.sendMail(details, (err) => {
    if (err) {
      console.log(err);
    } else {
      // This is only for dev
      // console.log("mail hase been sent");
    }
  });
};

export default handelEmailService;
