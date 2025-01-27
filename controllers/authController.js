const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");

// Fungsi untuk validasi input
const validateRegisterInput = (username, email, password, name) => {
  if (!username || !email || !password || !name) {
    return "All fields are required.";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  return null;
};

// Register User
const register = async (req, res) => {
  const { username, email, password, name } = req.body;

  // Validasi input
  const validationError = validateRegisterInput(username, email, password, name);
  if (validationError) {
    return res.status(400).json({ message: validationError });
  }

  try {
    // Periksa apakah email sudah terdaftar
    const userExists = await findUserByEmail(email);

    if (userExists.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Enkripsi password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Simpan user baru
    await createUser(username, email, hashedPassword, name);

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Database error" });
  }
};

// Login User
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari user berdasarkan email
    const userResult = await findUserByEmail(email);

    if (userResult.length === 0) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const user = userResult[0];

    // Periksa password menggunakan bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Buat JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Database error" });
  }
};

module.exports = {
  register,
  login,
};
