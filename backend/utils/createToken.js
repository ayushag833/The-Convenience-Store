import JWT from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = JWT.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log(token);
  res.cookie("JWT", token, {
    httpOnly: false,
    secure: false,
    sameSite: "None",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  return token;
};

export default generateToken;
