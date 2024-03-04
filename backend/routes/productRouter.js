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
import checkObjectId from "../middleware/checkObjectId.js";
// asyncHandler is used because we do many operation with Mongoose that do async operation

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProducts);
router
  .route("/:id")
  .get(checkObjectId, getProductsByID)
  .put(protect, admin, checkObjectId, updateProduct)
  .delete(protect, admin, checkObjectId, deleteProduct);

router.route("/:id/reviews").post(protect, checkObjectId, createdProductReview);

export default router;
