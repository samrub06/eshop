import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  getProductsByID,
  updateProduct,
} from "../controllers/productControler.js";
// asyncHandler is used because we do many operation with Mongoose that do async operation

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router
  .route("/:id")
  .get(getProductsByID)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
