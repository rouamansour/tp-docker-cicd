// server.js
const express = require("express"); // Web framework
const cors = require("cors");       // CORS management
const { Pool } = require("pg");     // PostgreSQL client

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection configuration for Render PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // nécessaire pour Render
});

// Middleware
app.use(express.json());

// CORS MIDDLEWARE: Allow cross-origin requests
app.use(
  cors({
    origin: [
      "http://localhost:8080", // garde pour dev local
      "http://127.0.0.1:8080",
      "https://tp-docker-cicd-g0csvinp1-rouamansours-projects.vercel.app", // frontend Vercel
    ],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ROUTE RACINE: éviter "Cannot GET /"
app.get("/", (req, res) => {
  res.send(
    "Backend is running! Use /api for API status or /db to access the database."
  );
});

// MAIN API ROUTE
app.get("/api", (req, res) => {
  res.json({
    message: "Hello from Backend!",
    timestamp: new Date().toISOString(),
    client: req.get("Origin") || "unknown",
    success: true,
  });
});

// DATABASE ROUTE: Retrieve data from database
app.get("/db", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json({
      message: "Data from Database",
      data: result.rows,
      timestamp: new Date().toISOString(),
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Database error",
      error: err.message,
      success: false,
    });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api`);
  console.log(`DB endpoint: http://localhost:${PORT}/db`);
});