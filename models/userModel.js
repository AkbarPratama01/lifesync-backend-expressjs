const db = require("../config/database");

const findUserByEmail = async (email) => {
  const connection = await db.getConnection(); // Ambil koneksi dari pool
  try {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await connection.execute(query, [email]);
    console.log("Query executed successfully:", query);
    console.log("Rows:", rows);
    return rows;
  } finally {
    connection.release(); // Pastikan koneksi dilepas kembali ke pool
  }
};

const createUser = async (username, email, password, name) => {
  const connection = await db.getConnection(); // Ambil koneksi dari pool
  try {
    const query =
      "INSERT INTO users (username, email, password, name) VALUES (?, ?, ?, ?)";
    const [result] = await connection.execute(query, [
      username,
      email,
      password,
      name,
    ]);
    console.log("Query executed successfully:", query);
    return result;
  } finally {
    connection.release(); // Pastikan koneksi dilepas kembali ke pool
  }
};

module.exports = {
  findUserByEmail,
  createUser,
};
