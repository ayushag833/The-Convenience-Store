import path from "path";
import express from "express";
import multer from "multer";
import uploadFile from "../utils/cloudinary.js";

const router = express.Router();

const storage = multer.diskStorage({});
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "backend/uploads");
//   },

//   filename: (req, file, cb) => {
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const filetypes = /jpe?g|png|webp/;
//   const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

//   const extname = path.extname(file.originalname).toLowerCase();
//   const mimetype = file.mimetype;

//   if (filetypes.test(extname) && mimetypes.test(mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Images only"), false);
//   }
// };

// const upload = multer({ storage, fileFilter });
const upload = multer({ storage });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, async (err) => {
    if (err) {
      res.status(400).send({ message: err?.message });
    } else if (req.file) {
      const upload = await uploadFile(req.file, "Store");
      res.status(200).send({
        message: "Image uploaded successfully",
        image: upload.secure_url,
      });
    } else {
      res.status(400).send({ message: "No image file provided" });
    }
  });
});

export default router;
