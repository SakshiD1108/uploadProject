import { check, validationResult } from "express-validator";
import util from "util";

export const validationMiddleware = {
  
  user: [
    check("userName").exists().isLength({ min: 2 }).withMessage("name is required"),

    check("password")
      .exists()
      .withMessage("password is required")
      .isStrongPassword()
      .isString()
      .isLength({ min: 8 })
      .not()
      .isLowercase()
      .not()
      .isUppercase()
      .not()
      .isNumeric()
      .not()
      .isAlpha()
      .withMessage("format is invalid"),
  ],
  login: [
    check("userName").exists().isLength({ min: 2 }).withMessage("name is required"),

    check("password")
      .exists()
      .withMessage("password is required")
      .isStrongPassword()
      .isString()
      .isLength({ min: 8 })
      .not()
      .isLowercase()
      .not()
      .isUppercase()
      .not()
      .isNumeric()
      .not()
      .isAlpha()
      .withMessage("format is invalid"),
    
  ],

 
};

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  console.log(req);
  if (!errors.isEmpty()) {
    console.log(util.inspect(errors.array()));
    return res.status(422).json({ errors: errors.array() });
  }

  next();
}
