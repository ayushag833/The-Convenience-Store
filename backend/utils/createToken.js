import JWT from "jsonwebtoken";

const generateToken = (res, userId) => {
  const token = JWT.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  console.log(token);

  try {
    res.cookie("Token", token, {
      domain: "the-convenience-store.onrender.com",
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    console.log("Setting up the Token");
  } catch (error) {
    console.error("Error setting cookie or sending response:", error);
    throw new Error("Failed in setting up the cookie");
  }

  // return res.cookie("Token", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV !== "development",
  //   sameSite: "strict",
  //   maxAge: 30 * 24 * 60 * 60 * 1000,
  // });
};

export default generateToken;
