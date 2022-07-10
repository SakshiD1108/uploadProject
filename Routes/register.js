import { factory } from "../respository-helper/factory";
import express from "express";
import bcrypt from "bcrypt";
import {
  validationMiddleware,
  handleValidationErrors,
} from "../validation-middleware";

export const router = express.Router();

export default router;

router.post(
  "/",
  validationMiddleware.user,
  handleValidationErrors,
  async (request, response) => {
    try {
      const userName = request.body.userName;
      const password = request.body.password;
      

      const doesUserExist = await factory
        .getMongobdUser()
        .getUserDetailsByUserName(userName);

      if (doesUserExist) {
        response.status(200).json({
          status: "USER_ALREADY_REGISTERED",
          message:
            "User already registered. Try Logging in or register with a new userName.",
        });
        return;
      }

      const hashedUserPassword = bcrypt.hashSync(password, 10);

      const creationDate = new Date();

      // save user to mongodb
      const registrationResult = await factory
        .getMongobdUser()
        .registerUser(
          userName,
          hashedUserPassword
         
        );

      if (registrationResult !== null) {
        response.status(200).json({
          status: "USER_REGISTERED_SUCCESSFULLY",
          message: "User registration successful.",
        });
        return;
      }
    } catch (error) {
      response.json({
        status: "FAILED",
        message: error.message,
      });
      return;
    }
  }
);
