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
} from "../controllers/userController.js";
// asyncHandler is used because we do many operation with Mongoose that do async operation

const router = express.Router();

router.route("/").post(registerUser).get(getUsers);
router.route("/:id").get(getUserByID).delete(deleteUser).put(updateUser);
router.route("/profile").post(logoutUser);
router.route("/login").post(authUser);
router.route("/logout").post(getUserProfile);

export default router;
