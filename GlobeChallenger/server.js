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
      "SELECT id, email, username, createdAt, profile_pic FROM users WHERE id = ?",
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

app.post("/api/score", (req, res) => {
  const { userId, gameId, difficultyId, region, score } = req.body;
  // Input validation
  if (!userId || !gameId || score === null || score === undefined) {
    return res.status(400).json({ error: "Invalid input parameters" });
  }

  let queryParams = [userId, gameId];
  let sqlQuery =
    "SELECT score FROM game_scores WHERE user_id = ? AND game_id = ?";

  // Add difficultyId and region to the query parameters and SQL query if they are not null
  if (difficultyId !== null && difficultyId !== undefined) {
    sqlQuery += " AND difficulty_id = ?";
    queryParams.push(difficultyId);
  }
  if (region !== null && region !== undefined) {
    sqlQuery += " AND region = ?";
    queryParams.push(region);
  }

  db.get(sqlQuery, queryParams, (err, row) => {
    if (err) {
      console.error("Failed to fetch score:", err.message);
      return res.status(500).json({ error: "Failed to fetch score" });
    }

    if (!row) {
      // If row doesn't exist, insert the new score
      db.run(
        "INSERT INTO game_scores (user_id, game_id, difficulty_id, region, score) VALUES (?, ?, ?, ?, ?)",
        [userId, gameId, difficultyId, region, score],
        (err) => {
          if (err) {
            console.error("Failed to insert score:", err.message);
            return res.status(500).json({ error: "Failed to insert score" });
          }
          res.status(200).json({ message: "Score inserted" });
        }
      );
    } else if (score > row.score) {
      // If the new score is higher, update the existing row
      db.run(
        "UPDATE game_scores SET score = ? WHERE user_id = ? AND game_id = ?" +
          (difficultyId !== null && difficultyId !== undefined
            ? " AND difficulty_id = ?"
            : "") +
          (region !== null && region !== undefined ? " AND region = ?" : ""),
        [
          ...(difficultyId !== null && difficultyId !== undefined
            ? [score, userId, gameId, difficultyId]
            : [score, userId, gameId]),
          ...(region !== null && region !== undefined ? [region] : []),
        ],
        (err) => {
          if (err) {
            console.error("Failed to update score:", err.message);
            return res.status(500).json({ error: "Failed to update score" });
          }
          res.status(200).json({ message: "Score updated" });
        }
      );
    } else {
      // If the new score is not higher, return a message indicating that
      res.status(200).json({
        message: "Score not updated, but existing score is higher",
      });
    }
  });
});

app.get("/api/scores/:userId", (req, res) => {
  const userId = req.params.userId;

  // Input validation
  if (!userId) {
    return res.status(400).json({ error: "Invalid input parameters" });
  }

  let sqlQuery = "SELECT * FROM game_scores WHERE user_id = ?";
  let queryParams = [userId];

  db.all(sqlQuery, queryParams, (err, rows) => {
    if (err) {
      console.error("Failed to fetch scores:", err.message);
      return res.status(500).json({ error: "Failed to fetch scores" });
    }

    if (!rows) {
      return res.status(404).json({ error: "No scores found for this user" });
    }

    res.status(200).json({ scores: rows });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
