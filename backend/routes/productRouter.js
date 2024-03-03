import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  createProduct,
  createdProductReview,
  deleteProduct,
  getProducts,
  getProductsByID,
  getTopProducts,
  updateProduct,
} from "../controllers/productControler.js";
// asyncHandler is used because we do many operation with Mongoose that do async operation

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);
router
  .route("/:id")
  .get(getProductsByID)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route("/:id/reviews").post(protect, createdProductReview);

export default router;
