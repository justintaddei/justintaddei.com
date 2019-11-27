import express from "express";
import jwt from "jsonwebtoken";
import { json } from "body-parser";
import multer from "multer";
import { v4 as uuid } from "uuid";
import { extname } from "path";
import { readFile, writeFile } from "fs";

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

app.get("/all", (req, res) => {
  res.json({
    data: [
      {
        id: "an id"
      },
      {
        id: "another id"
      }
    ]
  });
});

app.get("/:id", (req, res) => {
  res.json({
    id: req.params.id
  });
});

const uploadMiddleware = upload.fields([
  { name: "desktopImage", maxCount: 1 },
  { name: "mobileImage", maxCount: 1 }
]);

app.post("/", checkToken, uploadMiddleware, async ({ body, files }, res) => {
  const JSON_PATH = `${__dirname}/json/portfolio.json`;
  console.log(__dirname);
  readFile(JSON_PATH, (err, data) => {
    if (err) {
      res.sendStatus(500);
      console.error(err);
    }

    const json = JSON.parse(data);

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
