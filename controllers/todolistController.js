const { getTodolistByUserId, addTodolistItem, deleteTodolistItem, updateTodolistItem } = require("../models/todolistModel");

// Mendapatkan semua todolist untuk user tertentu
const getTodolist = async (req, res) => {
  try {
    const userId = req.user.id; // Ambil user_id dari token JWT
    const todolist = await getTodolistByUserId(userId);
    res.status(200).json({ todolist });
  } catch (error) {
    console.error("Error fetching todolist:", error);
    res.status(500).json({ message: "Failed to fetch todolist" });
  }
};

// Menambahkan item ke todolist
const addTodolist = async (req, res) => {
  try {
    const userId = req.user.id; // Ambil user_id dari token JWT
    const { task, due_date, is_completed } = req.body;

    if (!task || !due_date) {
      return res.status(400).json({ message: "Description are required" });
    }

    await addTodolistItem(userId, task, due_date, is_completed);
    res.status(201).json({ message: "Todolist item added successfully" });
  } catch (error) {
    console.error("Error adding todolist item:", error);
    res.status(500).json({ message: "Failed to add todolist item" });
  }
};

// Menghapus item todolist
const deleteTodolist = async (req, res) => {
  try {
    const userId = req.user.id; // Ambil user_id dari token JWT
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Todolist item ID is required" });
    }

    await deleteTodolistItem(id, userId);
    res.status(200).json({ message: "Todolist item deleted successfully" });
  } catch (error) {
    console.error("Error deleting todolist item:", error);
    res.status(500).json({ message: "Failed to delete todolist item" });
  }
};

// Mengupdate item todolist
const updateTodolist = async (req, res) => {
    try {
      const userId = req.user.id; // Ambil user_id dari token JWT
      const { id } = req.params; // ID dari item todolist yang ingin diperbarui
      const { task, due_date, is_completed } = req.body; // Data baru untuk pembaruan
  
      if (!id || !task || !due_date) {
        return res.status(400).json({ message: "ID, task, and due_date are required" });
      }
  
      const result = await updateTodolistItem(id, userId, task, due_date, is_completed);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Todolist item not found or unauthorized" });
      }
  
      res.status(200).json({ message: "Todolist item updated successfully" });
    } catch (error) {
      console.error("Error updating todolist item:", error);
      res.status(500).json({ message: "Failed to update todolist item" });
    }
};

module.exports = {
  getTodolist,
  addTodolist,
  deleteTodolist,
  updateTodolist,
};
