import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { validationMiddleware } from "./validation-middleware";

import { authenticateUserJWT } from "./authentication-hepler/validate-user-jwt-middleware";

import { userRouter } from "./Routes/router";
import path from "path";

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
let __dirname = path.resolve();

app.use("/", express.static(path.join(__dirname, ``)));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/Routes", userRouter);

app.listen(process.env.port, "0.0.0.0", () => {
  console.log(`Server listening on port ${process.env.port}...`);
});
