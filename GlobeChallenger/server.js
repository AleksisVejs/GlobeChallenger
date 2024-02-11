const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// JWT
const jwt = require("jsonwebtoken");

// Connect to SQLite database
const db = new sqlite3.Database("./db/database.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Define routes
// Add your routes for authentication (register, login, logout) here
app.post("/api/register", (req, res) => {
  const { email, username, password } = req.body;
  // SQLite expects date in the format "YYYY-MM-DD"
  const createdAt = new Date().toISOString().split("T")[0];
  db.run(
    "INSERT INTO users (email, username, password, createdAt) VALUES (?, ?, ?, ?)",
    [email, username, password, createdAt],
    (err) => {
      if (err) {
        console.error("Registration failed:", err.message);
        res.status(500).send("Registration failed");
      } else {
        res.status(200).send("Registration successful");
      }
    }
  );
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  db.get(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, row) => {
      if (err) {
        console.error("Login failed:", err.message);
        res.status(500).send("Login failed");
      } else if (!row) {
        res.status(401).send("Username or password is incorrect");
      } else {
        // Generate JWT token
        const token = jwt.sign({ userId: row.id }, "secret_key", {
          expiresIn: "1h",
        });
        res.status(200).json({ user: row, token: token });
      }
    }
  );
});

app.post("/api/logout", (req, res) => {
  res.status(200).send("Logout successful");
});

app.get("/api/user", (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header
  try {
    // Verify token
    const decoded = jwt.verify(token, "secret_key");
    const userId = decoded.userId;
    // Query database to get user information
    db.get("SELECT * FROM users WHERE id = ?", [userId], (err, row) => {
      if (err) {
        console.error("Failed to fetch user:", err.message);
        res.status(500).send("Failed to fetch user");
      } else if (!row) {
        res.status(404).send("User not found");
      } else {
        res.status(200).json(row); // Send user information as JSON response
      }
    });
  } catch (error) {
    console.error("Failed to verify token:", error.message);
    res.status(401).send("Unauthorized");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
