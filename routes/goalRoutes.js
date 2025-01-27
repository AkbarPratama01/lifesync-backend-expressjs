const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const { getGoallist, addGoal, deleteGoal, updateGoal } = require("../controllers/goalController");

const router = express.Router();

// Mendapatkan semua goals
router.get("/", authenticateToken, getGoallist);

// Menambahkan goal item
router.post("/add", authenticateToken, addGoal);

// Menghapus goal item
router.delete("/delete/:id", authenticateToken, deleteGoal);

// Memperbarui goal item
router.put("/update/:id", authenticateToken, updateGoal);

// Ekspor router
module.exports = router;
