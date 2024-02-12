import express  from "express";
import products from "./data/products.js"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import productRouter from "./routes/productRouter.js"
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";


dotenv.config()
const port = process.env.PORT || 5001
const host= process.env.HOST
const app = express()

connectDB()

app.use("/api/products", productRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=> console.log(`Server running on port ${host}:${port}/`))