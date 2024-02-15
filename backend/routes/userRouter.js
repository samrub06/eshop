import express from "express";
import {
  authUser,
  deleteUser,
  getUserByID,
  getUserProfile,
  getUsers,
  logoutUser,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";
// asyncHandler is used because we do many operation with Mongoose that do async operation

const router = express.Router();

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/logout").post(logoutUser);

router.route("/auth").post(authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router
  .route("/:id")
  .get(protect, admin, getUserByID)
  .delete(protect, admin, deleteUser)
  .put(protect, admin, updateUser);

export default router;
