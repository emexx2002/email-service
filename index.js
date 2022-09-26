var express = require("express");
var router = express.Router();
var nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey('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')
var cors = require("cors");
const creds = require("./config");

router.post("/send", (req, res, next) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var content = `name: ${name} \n email: ${email} \n message: ${message} `;
  var mail = {
    from: '0x7lol@gmail.com',
    to: "aguchukwuemekag@gmail.com", // Change to email address that you want to receive messages on
    subject: "New Message from Contact Form",
    text: content,
  };
  sgMail
  .send(mail)
  .then(() => {
    res.json({
      status: "success",
    });
  })
  .catch((error) => {
    res.json({
      status: "fail",
      error
    });
  })
  // transporter.sendMail(mail, (err, data) => {
  //   if (err) {
  //     res.json({
  //       status: "fail",
  //     });
  //     transporter.sendMail(
  //       {
  //         from: "<your email address>",
  //         to: email,
  //         subject: "Submission was successful",
  //         text: `Thank you for contacting us!\n\nForm details\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  //       },
  //       function (error, info) {
  //         if (error) {
  //           console.log(error);
  //         } else {
  //           console.log("Message sent: " + info.response);
  //         }
  //       }
  //     );
  //   } else {
  //     res.json({
  //       status: "success",
  //     });
  //   }
  // });
});
const app = express();
app.use(cors({
    origin: '*',
}));
app.use(express.json());
app.use("/", router);
app.listen(3002);
