import { json } from "body-parser";
import express from "express";
import { readFile, writeFile } from "fs";
import jwt from "jsonwebtoken";
import multer from "multer";
import { extname } from "path";
import { v4 as uuid } from "uuid";

require("dotenv").config();

const JSON_PATH = `${__dirname}/../static/json/portfolio.json`;
function getPortfolioJSON() {
  return new Promise(resolve => {
    readFile(JSON_PATH, (err, data) => {
      if (err) {
        console.error(err);
        return reject(err);
      }

      resolve(JSON.parse(data));
    });
  });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: "static/uploads/",
    filename(req, file, cb) {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    }
  })
});

const app = express();

app.use(json());

app.get("/all", async (req, res) => {
  res.json(await getPortfolioJSON());
});

app.get("/:domain", async (req, res) => {
  const { portfolio } = await getPortfolioJSON();

  const searchDomain = req.params.domain;

  for (const entry of portfolio) {
    if (entry.domain === searchDomain)
      return res.json({
        data: entry,
        error: null
      });
  }

  return res.json({
    data: null,
    error: "UNKNOWN_DOMAIN"
  });
});

const uploadMiddleware = upload.fields([
  { name: "desktopImage", maxCount: 1 },
  { name: "mobileImage", maxCount: 1 }
]);

app.post("/", checkToken, uploadMiddleware, async ({ body, files }, res) => {
  const json = await getPortfolioJSON().catch(err => {
    res.sendStatus(500);
  });

  json.portfolio.unshift({
    ...body,
    desktopImage: `/uploads/${files.desktopImage[0].filename}`,
    mobileImage: `/uploads/${files.mobileImage[0].filename}`
  });

  writeFile(JSON_PATH, JSON.stringify(json, null, 2), err => {
    if (err) {
      res.sendStatus(500);
      console.error(err);
    }

    res.sendStatus(200);
  });
});

function checkToken(req, res, next) {
  let token = req.headers["authorization"];

  if (!token) {
    res.sendStatus(403);
    return;
  }

  token = token.split(" ")[1];

  if (!token) {
    res.sendStatus(403);
    return;
  }

  jwt.verify(token, process.env.JUSTIN_JWT_KEY, err => {
    if (err) res.sendStatus(403);
    else {
      next();
    }
  });
}

export default {
  path: "/api/portfolio",
  handler: app
};
