import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("hello from asdf");
});

app.get("/:id", (req, res) => {
  res.send("hello from" + req.params.id);
});

export default {
  path: "/api",
  handler: app
};
