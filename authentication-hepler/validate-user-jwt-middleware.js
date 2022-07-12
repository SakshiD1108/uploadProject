import jwt from "jsonwebtoken";
import { factory } from "../respository-helper/factory";

export const authenticateUserJWT = (request, response, next) => {
  try {
    async function validateUserJwt(userObject) {
      request.userName = userObject.userName;
      
      const doesUserExist = await factory
        .getMongobdUser()
        .getByUser(userObject.userName);

      console.log(doesUserExist);

      if (doesUserExist === null) {
        response.status(500).json({
          status: "JWT_INVALID",
          message: "user not exist.",
        });
        return;
      }
    }

    const authHeader = request.header("authorization");

    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, process.env.secretKey, async (err, userObject) => {
        if (err) {
          response.status(500).json({
            status: "JWT_INVALID",
            message: err.message,
          });
          return;
        } else {
          switch (userObject.type) {
            case "USER":
              validateUserJwt(userObject);
              break;
          }
        }
        next();
      });
    } else {
      response.status(500).json({
        status: "JWT_INVALID",
        message: "Your session has ended. Please login again.",
      });
      return;
    }
  } catch (error) {
    console.log("error: ", error);
    next();
  }
};
