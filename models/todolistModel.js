const db = require("../config/database");

// Fungsi untuk mendapatkan semua todolist berdasarkan user_id
const getTodolistByUserId = async (userId) => {
  const query = "SELECT * FROM todos WHERE user_id = ?";
  const [rows] = await db.execute(query, [userId]);
  return rows;
};

// Fungsi untuk menambahkan item todolist
const addTodolistItem = async (userId, task, due_date, is_completed) => {
  const query = "INSERT INTO todos (user_id, task, due_date, is_completed) VALUES (?, ?, ?, ?)";
  const [result] = await db.execute(query, [userId, task, due_date, is_completed]);
  return result;
};

// Fungsi untuk menghapus item todolist berdasarkan id
const deleteTodolistItem = async (id, userId) => {
  const query = "DELETE FROM todos WHERE id = ? AND user_id = ?";
  const [result] = await db.execute(query, [id, userId]);
  return result;
};

// Fungsi untuk memperbarui item todolist
const updateTodolistItem = async (id, userId, task, due_date, is_completed) => {
    const query = `
      UPDATE todos 
      SET task = ?, due_date = ?, is_completed = ? 
      WHERE id = ? AND user_id = ?
    `;
    const [result] = await db.execute(query, [task, due_date, is_completed, id, userId]);
    return result;
};

module.exports = {
  getTodolistByUserId,
  addTodolistItem,
  deleteTodolistItem,
  updateTodolistItem,
};
