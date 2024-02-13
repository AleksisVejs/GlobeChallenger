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
app.post("/api/register", (req, res) => {
  const { email, username, password } = req.body;
  const createdAt = new Date().toISOString().split("T")[0];
  db.run(
    "INSERT INTO users (email, username, password, createdAt) VALUES (?, ?, ?, ?)",
    [email, username, password, createdAt],
    (err) => {
      if (err) {
        console.error("Registration failed:", err.message);
        res.status(500).send(err.message);
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
        res.status(500).send(err.message);
      } else if (row) {
        // User found, return user data and token
        const { id, email, username, createdAt } = row;
        const user = { id, email, username, createdAt };
        const token = jwt.sign({ id: user.id }, "secret_key", {
          expiresIn: "1h",
        });
        res.status(200).json({ user, token });
      } else {
        // No user found with the provided username and password
        res.status(401).send("Invalid username or password.");
      }
    }
  );
});

app.post("/api/logout", (req, res) => {
  res.status(200).send("Logout successful");
});

app.get("/api/user", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.includes(" ")) {
    return res.status(401).send("Missing or malformed authorization header");
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Missing token");
  }

  try {
    const decoded = jwt.verify(token, "secret_key");
    const userId = decoded.id;
    db.get(
      "SELECT id, email, username, createdAt FROM users WHERE id = ?",
      [userId],
      (err, row) => {
        if (err) {
          console.error("Failed to fetch user:", err.message);
          res.status(500).send(err.message);
        } else if (row) {
          res.status(200).json(row);
        } else {
          res.status(404).send("User not found");
        }
      }
    );
  } catch (error) {
    console.error("Failed to verify token:", error.message);
    res.status(401).send("Unauthorized");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
