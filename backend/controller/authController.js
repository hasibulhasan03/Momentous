import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role === "admin" ? "admin" : "user", // Only allow valid roles
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully!" });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        console.log("🔍 Debug - Sending Response:", {
            message: "Login successful!",
            token,
            user: { id: user._id, role: user.role }
        });

        res.status(200).json({
            message: "Login successful!",
            token,
            user: { id: user._id, role: user.role },
        });

    } catch (error) {
        console.error("❌ Backend Error:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};



export const getUser = async (req, res) => {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Update fields
        if (req.body.name) user.name = req.body.name;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10); // Generate salt
            user.password = await bcrypt.hash(req.body.password, salt); // Hash password
        }

        await user.save();
        res.json({ success: true, message: "Profile updated successfully" });

    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token"); // Clear cookie if using cookies
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Logout failed" });
    }
};

