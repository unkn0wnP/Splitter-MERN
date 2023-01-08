const nodemailer = require("nodemailer")
require("dotenv").config();

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

module.exports.sendConfirmationMail = (usernmae,to,confirmationcode)=>{
    transport.sendMail({
        user:process.env.EMAIL,
        to:to,
        subject:"Please confirm your account for splitter",
        html:`<h1>Email Confirmation</h1>
        <h2>Hello ${usernmae}</h2>
        <p>Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3001/verify/${confirmationcode}> Click here</a>`
    })
    .catch((error) => {
        console.log(error)
      });
  }