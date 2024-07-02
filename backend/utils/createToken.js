import JWT from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = JWT.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log(token);

  try {
    res.cookie("Token", token, {
      secure: true,
      sameSite: "none",
    });
  } catch (error) {
    console.error("Error setting cookie or sending response:", error);
    return res.status(500).send("Internal Server Error");
  }

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
