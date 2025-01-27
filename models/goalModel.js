const db = require("../config/database");

// Fungsi untuk mendapatkan semua goal berdasarkan user_id
const getGoalByUserId = async (userId) => {
    const query = "SELECT * FROM goals WHERE user_id = ?";
    const [rows] = await db.execute(query, [userId]);
    return rows;
};

// Fungsi untuk menambahkan item goal
const addGoalItem = async (userId, text, year, is_completed) => {
    const query = "INSERT INTO goals (user_id, text, year, is_completed) VALUES (?, ?, ?, ?)";
    const [result] = await db.execute(query, [userId, text, year, is_completed]);
    return result;
};

// Fungsi untuk menghapus item todolist berdasarkan id
const deleteGoalItem = async (id, userId) => {
    const query = "DELETE FROM goals WHERE id = ? AND user_id = ?";
    const [result] = await db.execute(query, [id, userId]);
    return result;
};

// Fungsi untuk memperbarui item todolist
const updateGoalItem = async (id, userId, text, year, is_completed) => {
    const query = `
      UPDATE todos 
      SET text = ?, year = ?, is_completed = ? 
      WHERE id = ? AND user_id = ?
    `;
    const [result] = await db.execute(query, [text, year, is_completed, id, userId]);
    return result;
};

module.exports = {
    getGoalByUserId,
    addGoalItem,
    deleteGoalItem,
    updateGoalItem,
};