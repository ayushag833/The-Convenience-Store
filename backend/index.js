import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

// packages
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// Utiles
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const port = process.env.PORT || 5000;

console.log(process.env.JWT_SECRET);

connectDB();

const app = express();

app.use(
  cors({
    origin: "https://the-convenience-store.netlify.app",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname + "/backend/uploads")));

app.listen(port, () => console.log(`Server running on port: ${port}`));
