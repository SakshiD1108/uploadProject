import express from "express";
import register from "./register";
import login from "./login";
import upload from "./upload";


export const userRouter = express.Router();
userRouter.use("/register", register);
userRouter.use("/login", login);
userRouter.use("/upload", upload);
