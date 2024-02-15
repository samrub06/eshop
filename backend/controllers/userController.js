import jwt from "jsonwebtoken";
import { asyncHandler } from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";

//@desc Auth user & get token
//@route POST/api/users/login
//@access Public

export const authUser = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // Set JWT as HTTP-only cookie
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    const { _id, name, email, isAdmin } = user;
    res.send({
      _id: _id,
      name: name,
      email: email,
      isAdmin: isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Register user
//@route POST/api/users
//@access Public

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
//@desc Logout user / clear cokie
//@route POST/api/users/logout
//@access Public

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

//@desc Get user profile
//@route POST/api/users/profile
//@access Public

export const getUserProfile = asyncHandler(async (req, res) => {
  res.send("get user profile");
});

//@desc update user profile
//@route PUT/api/users/profile
//@access Private

export const updateUserProfile = asyncHandler(async (req, res) => {
  res.send("update user profile");
});

//@desc Get users
//@route GET api/users
//@access Private/Admin

export const getUsers = asyncHandler(async (req, res) => {
  res.send("get users");
});

//@desc Get user by Id
//@route GET api/users/:id
//@access Private/Admin

export const getUserByID = asyncHandler(async (req, res) => {
  res.send("get user By Id");
});

//@desc Delete users
//@route DELETE api/users/:id
//@access Private/Admin

export const deleteUser = asyncHandler(async (req, res) => {
  res.send("delete user");
});

//@desc Update user
//@route UPDATE api/users/:id
//@access Private/Admin

export const updateUser = asyncHandler(async (req, res) => {
  res.send("update user");
});
