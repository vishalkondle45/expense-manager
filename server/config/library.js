let nodemailer = require("nodemailer");

exports.sendMail = (mailData) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "vishal.kondle@gmail.com",
      pass: "dpbczkokzlfkrmhx",
    },
    secure: true,
  });
  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      return res.status(500).json({
        message: err.message,
        stack: err.stack,
      });
    }
  });
};
