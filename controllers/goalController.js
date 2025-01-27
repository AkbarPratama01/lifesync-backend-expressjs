const { getGoalByUserId, addGoalItem, deleteGoalItem, updateGoalItem } = require("../models/goalModel");

// Mendapatkan semua goals untuk user tertentu
const getGoallist = async (req, res) => {
    try {
        const userId = req.user.id; // Ambil user_id dari token JWT
        const goallist = await getGoalByUserId(userId);
        res.status(200).json({ goallist });
    } catch (error) {
        console.error("Error fetching goals:", error);
        res.status(500).json({ message: "Failed to fetch goals" });
    }
};

// Menambahkan item ke goal
const addGoal = async (req, res) => {
    try {
      const userId = req.user.id; // Ambil user_id dari token JWT
      const { text, year, is_completed } = req.body;
  
      if (!text || !year) {
        return res.status(400).json({ message: "Description are required" });
      }
  
      await addGoalItem(userId, text, year, is_completed);
      res.status(201).json({ message: "Goal item added successfully" });
    } catch (error) {
      console.error("Error adding goal item:", error);
      res.status(500).json({ message: "Failed to add goal item" });
    }
};

// Menghapus item todolist
const deleteGoal = async (req, res) => {
    try {
      const userId = req.user.id; // Ambil user_id dari token JWT
      const { id } = req.params;
  
      if (!id) {
        return res.status(400).json({ message: "Goal item ID is required" });
      }
  
      await deleteGoalItem(id, userId);
      res.status(200).json({ message: "Goal item deleted successfully" });
    } catch (error) {
      console.error("Error deleting goal item:", error);
      res.status(500).json({ message: "Failed to delete goal item" });
    }
};

// Mengupdate item todolist
const updateGoal = async (req, res) => {
    try {
      const userId = req.user.id; // Ambil user_id dari token JWT
      const { id } = req.params; // ID dari item todolist yang ingin diperbarui
      const { text, year, is_completed } = req.body; // Data baru untuk pembaruan
  
      if (!id || !text || !year) {
        return res.status(400).json({ message: "ID, text, and year are required" });
      }
  
      const result = await updateGoalItem(id, userId, text, year, is_completed);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Goals item not found or unauthorized" });
      }
  
      res.status(200).json({ message: "Goals item updated successfully" });
    } catch (error) {
      console.error("Error updating goal item:", error);
      res.status(500).json({ message: "Failed to update goal item" });
    }
};

module.exports = {
    getGoallist,
    addGoal,
    deleteGoal,
    updateGoal,
};