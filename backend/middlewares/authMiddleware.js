import JWT from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// const getCookieFromFrontend = async (req, res, next) => {
//   try {
//     const token = req.body;
//     return token;
//   } catch (error) {
//     res.status(401);
//     res.send("Getting token from frontend failed!");
//   }
// };

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.cookies.JWT;
  console.log(token);
  if (token) {
    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

const authorizeAdmin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
});

export { authenticate, authorizeAdmin };
