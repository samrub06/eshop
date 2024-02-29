import express, { json } from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRoutes.js";
import userRouter from "./routes/userRouter.js";
import uploadRouter from "./routes/uploadRouter.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

dotenv.config();
const port = process.env.PORT || 5001;
const host = process.env.HOST;
const app = express();

connectDB();

const corsOptions = {
  origin: true, // Change this to the origin(s) you want to allow.
  credentials: true, // Indicates that cookies and credentials should be included.
};

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie Parser Middleware
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
app.use("/api/upload", uploadRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve(); // set __dirname to current directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${host}:${port}/`));
