import express from "express";
import { registerUser, loginUser } from "../controller/authController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { getUser } from "../controller/authController.js";
import { updateProfile } from "../controller/authController.js";
import { logoutUser } from "../controller/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", isAuthenticated, getUser);
router.put("/update", isAuthenticated, updateProfile);
router.put("/update", isAuthenticated, updateProfile);
router.post("/logout", logoutUser);


export default router;