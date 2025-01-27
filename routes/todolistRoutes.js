const express = require("express");
const { authenticateToken } = require("../middleware/authMiddleware");
const { getTodolist, addTodolist, deleteTodolist, updateTodolist } = require("../controllers/todolistController");

const router = express.Router();

// Mendapatkan semua todolist
router.get("/", authenticateToken, getTodolist);

// Menambahkan todolist item
router.post("/add", authenticateToken, addTodolist);

// Menghapus todolist item
router.delete("/delete/:id", authenticateToken, deleteTodolist);

// Memperbarui todolist item
router.put("/update/:id", authenticateToken, updateTodolist);

module.exports = router;
