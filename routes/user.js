const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/auth"); // Ensure this middleware exists

// Get logged-in user details
router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user details (only the logged-in user can update their profile)
router.put("/", authMiddleware, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
            new: true,
        }).select("-password");
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete user account (only the logged-in user can delete their account)
router.delete("/", authMiddleware, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin route: Get any user by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });

        const user = await User.findById(req.params.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin route: Update any user by ID
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });

        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Admin route: Delete any user by ID
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(403).json({ message: "Access denied" });

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
