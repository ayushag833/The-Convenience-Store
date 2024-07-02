import { v2 as cloudinary } from "cloudinary";

// import dotenv from "dotenv";
// dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadFile = async (file, folder) => {
  const options = { folder };
  try {
    const result = await cloudinary.uploader.upload(file.path, options);
    return result;
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "No file provided" });
  }
};

export default uploadFile;
