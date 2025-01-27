require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const todolistRoutes = require("./routes/todolistRoutes");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware untuk membaca JSON request
app.use(express.urlencoded({ extended: true }));

// Jika menggunakan body-parser (versi lama)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Gunakan routes untuk autentikasi
app.use('/auth', authRoutes);

// Rute todolist
app.use("/api/todolist", todolistRoutes);

app.use((req, res, next) => {
    console.log('Request Method:', req.method);
    console.log('Request URL:', req.url);
    console.log('Request Headers:', req.headers);
    console.log('Request Body:', req.body);
    next();
  });
  

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
