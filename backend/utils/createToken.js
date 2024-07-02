import JWT from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = JWT.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log(token);

  return res
    .cookie("Token", token, {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .send("user logged in successfully");
  // return res.cookie("Token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development",
  //   sameSite: "strict",
  //   maxAge: 30 * 24 * 60 * 60 * 1000,
  // });

  // return res
  //     .cookie("accessToken", accessToken, {
  //       sameSite: "none",
  //       secure: true,
  //     })
  //     .status(200)
  //     .send(userDetails);
};

export default generateToken;
