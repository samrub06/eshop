import express, { json } from "express";
import products from "./data/products.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRouter from "./routes/productRouter.js";
import orderRouter from "./routes/orderRoutes.js";
import userRouter from "./routes/userRouter.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const port = process.env.PORT || 5001;
const host = process.env.HOST;
const app = express();

connectDB();

// Configuration CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Autoriser les requêtes provenant de cette origine
    methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes HTTP autorisées
    allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
  })
);

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookie Parser Middleware
app.use(cookieParser());

app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${host}:${port}/`));
