const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 3000;

// Database connection configuration for Render PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ⚡ Initialise la base de données avant de démarrer le serveur
async function initDb() {
  try {
    // Crée la table si elle n'existe pas
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insère un utilisateur test si aucun utilisateur n'existe
    const { rows } = await pool.query("SELECT COUNT(*) FROM users");
    if (parseInt(rows[0].count) === 0) {
      await pool.query(
        `INSERT INTO users (username, email, password) VALUES ($1, $2, $3)`,
        ["testuser", "test@example.com", "password123"]
      );
      console.log("Utilisateur test ajouté : testuser / test@example.com");
    }

    console.log("Base de données prête !");
  } catch (err) {
    console.error("Erreur lors de l'initialisation de la DB:", err);
  }
}

// Middleware
app.use(express.json());

app.use(cors()); // autorise toutes les origines

// ROUTES
app.get("/", (req, res) => {
  res.send(
    "Backend is running! Use /api for API status or /db to access the database."
  );
});

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from Backend!",
    timestamp: new Date().toISOString(),
    client: req.get("Origin") || "unknown",
    success: true,
  });
});

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

// ⚡ Démarre le serveur seulement après que la DB soit prête
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
    console.log(`API endpoint: http://localhost:${PORT}/api`);
    console.log(`DB endpoint: http://localhost:${PORT}/db`);
  });
});