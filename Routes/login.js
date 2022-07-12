import express from "express";
import { generateUserJwt } from "../authentication-hepler/generate-user-jwt";
import { factory } from "../respository-helper/factory";
import bcrypt from "bcrypt";
import {
  validationMiddleware,
  handleValidationErrors,
} from "../validation-middleware";
import client from "../respository-helper/mongodb-user";

export const router = express.Router();
export default router;


router.post(
  "/",
  validationMiddleware.login,
  handleValidationErrors,
  async (request, response) => {
    try {
      const userName = request.body.userName;
      const password = request.body.password

      const user = await factory
        .getMongobdUser()
        .getByUser(userName);

        console.log(user)

      if (user !== null) {
        const compareUserPassword = bcrypt.compareSync(password, user.password);

        if (compareUserPassword !== null) {
          let jwtToken = await generateUserJwt(user.userName);

          if (jwtToken) {
            response.status(200).json({
              status: "LOGIN_SUCCESSFUL",
              message: "Login successful.",
              jwt: jwtToken,
            });
            return;
          }
        } else {
          response.status(200).json({
            status: "INCORRECT_PASSWORD",
            message:
              "Please check your password and try again. If you have forgotten your password then click on Forgot Password to reset it.",
          });
          return;
        }
      }

      response.status(200).json({
        status: "USER_DOES_NOT_EXIST",
        message:
          "User does not exist. If you haven't registered then please register yourself first.",
      });
      return;
    } catch (error) {
      response.json({
        status: "FAILED",
        message: error.message,
      });
      return;
    }
  }
);
