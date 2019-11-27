import axios from "axios";
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

// Create the transporter with the required configuration for Outlook
// change the user and pass !
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname
  secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  tls: {
    ciphers: "SSLv3"
  },
  auth: {
    user: process.env.OUTLOOK_ADDRESS,
    pass: process.env.OUTLOOK_APP_PASSWORD
  }
});

// Create app
const app = express();

// Install middleware
app.use(express.json());

// -- Routes --
app.post("/", async (req, res) => {
  const { name, email, phone, message, recaptchaToken } = req.body;

  if (!name) return res.status(200).send("Please enter your name");
  if (!email) return res.status(200).send("Please enter your email");
  if (!phone) return res.status(200).send("Please enter your phone number");
  if (!message) return res.status(200).send("Please enter a message");
  if (!recaptchaToken)
    return res
      .status(200)
      .send('Please complete the "I\'m not a robot" checkbox');

  try {
    const recaptchaRes = await axios({
      method: "post",
      url: `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaToken}`
    });

    if (!recaptchaRes.data.success) {
      return res.status(200).send("Invalid recaptcha input");
    }
  } catch (e) {
    console.error(e);
    return res.status(200).send("Failed to reach google");
  }

  // setup e-mail data, even with unicode symbols
  const mailOptions = {
    from: `"Justin Taddei" <${process.env.OUTLOOK_ADDRESS}>`, // sender address (who sends)
    to: process.env.OUTLOOK_ADDRESS, // list of receivers (who receives)
    replyTo: email,
    subject: `Website form submission from ${name}`, // Subject line
    html: `
        <h1>Inquiry</h1>
        <ul>
            <li>Name: ${name}</li>
            <li>Email: <a href="mailto:${email}">${email}</a></li>
            <li>Phone: <a href="tel:${phone}">${phone}</a></li>
        </ul>
        <h2>Message:</h2>
        <p>${message}</p>
    `
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.error(error);
      return res.status(500).send("Failed to send. Please try again.");
    }
    res.status(200).send("Message sent");
  });
});

app.get("/", (req, res) => {
  res.status(401).send("access denied");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err); // eslint-disable-line no-console
  res.status(401).send(err + "");
});

// -- export app --
export default {
  path: "/api/contact-form",
  handler: app
};
