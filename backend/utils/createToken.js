import JWT from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = JWT.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log(token);
  res
    .cookie("JWT", token, {
      httpOnly: false,
      secure: false,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      success: true,
      message: "User logged in successfully",
    });

  return token;
};

export default generateToken;
