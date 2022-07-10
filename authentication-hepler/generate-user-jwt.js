import jwt from "jsonwebtoken";

export const generateUserJwt = (userName) => {
  return jwt.sign(
    { type: "USER", userName:userName },
    process.env.secretKey,
    {
      expiresIn: "7d",
    }
  );
};
