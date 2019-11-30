const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
require("dotenv").config();

// Create app
const app = express();

// Install middleware
app.use(cookieParser());
app.use(bodyParser.json());

// JWT middleware
app.use(
  jwt({
    secret: process.env.JUSTIN_JWT_KEY
  }).unless({
    path: "/api/auth/login"
  })
);

// -- Routes --

// [POST] /login
app.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  const valid =
    username === process.env.JUSTIN_USERNAME &&
    password === process.env.JUSTIN_PASSWORD;

  if (!valid) {
    throw new Error("Invalid username or password");
  }

  const accessToken = jsonwebtoken.sign(
    {
      scope: ["admin"]
    },
    process.env.JUSTIN_JWT_KEY
  );

  res.json({ token: accessToken });
});

// [POST] /logout
app.post("/logout", (req, res, next) => {
  res.json({ status: "OK" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err); // eslint-disable-line no-console
  res.status(401).send(err + "");
});

// -- export app --
module.exports = {
  path: "/api/auth",
  handler: app
};
