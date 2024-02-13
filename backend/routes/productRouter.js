import express from "express";
import { getProducts, getProductsByID } from "../controllers/productControler.js";
// asyncHandler is used because we do many operation with Mongoose that do async operation

const router = express.Router();

router.route("/").get(getProducts)
router.route("/:id").get(getProductsByID)

export default router;
