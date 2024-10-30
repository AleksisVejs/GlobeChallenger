const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const sanitizeHtml = require('sanitize-html');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const csurf = require('csurf');
const csrfProtection = csurf({ cookie: true });

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
    },
  })
);
app.use(express.static(path.join(__dirname, "dist")));

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CSRF protection
app.use(csrfProtection);

// Connect to SQLite database
const db = new sqlite3.Database("./db/database.db", (err) => {
  if (err) {
    console.error("Database connection error:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Define routes
app.post("/api/register", async (req, res) => {
  const { email, username, password } = req.body;
  const sanitizedEmail = sanitizeHtml(email);
  const sanitizedUsername = sanitizeHtml(username);
  const hashedPassword = await bcrypt.hash(sanitizeHtml(password), 10);
  const createdAt = new Date().toISOString().split("T")[0];
  db.run(
    "INSERT INTO users (email, username, password, createdAt) VALUES (?, ?, ?, ?)",
    [sanitizedEmail, sanitizedUsername, hashedPassword, createdAt],
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
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, row) => {
      if (err) {
        console.error("Login failed:", err.message);
        res.status(500).send(err.message);
      } else if (row && await bcrypt.compare(password, row.password)) {
        // User found and password matches, return user data and token
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

app.put("/api/user", (req, res) => {
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
    const userData = req.body;
    const newEmail = userData.email;

    db.get("SELECT id FROM users WHERE email = ?", [newEmail], (err, row) => {
      if (err) {
        console.error("Failed to fetch user by email:", err.message);
        res.status(500).send(err.message);
      } else if (row && row.id !== decoded.id) {
        res.status(400).send("Email is already in use");
      } else {
        const placeholders = Object.keys(userData)
          .map((key) => `${key} = ?`)
          .join(", ");
        const sql = `UPDATE users SET ${placeholders} WHERE id = ?`;
        db.run(sql, [...Object.values(userData), decoded.id], function (err) {
          if (err) {
            console.error("Failed to update user:", err.message);
            res.status(500).send(err.message);
          } else {
            res.status(200).send("User updated successfully");
          }
        });
      }
    });
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
});

app.delete("/api/user", (req, res) => {
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
    db.run("DELETE FROM game_scores WHERE user_id = ?", [decoded.id], (err) => {
      if (err) {
        console.error("Failed to delete user's scores:", err.message);
        res.status(500).send(err.message);
      } else {
        db.run("DELETE FROM users WHERE id = ?", [decoded.id], (err) => {
          if (err) {
            console.error("Failed to delete user:", err.message);
            res.status(500).send(err.message);
          } else {
            res
              .status(200)
              .send("User and related scores deleted successfully");
          }
        });
      }
    });
  } catch (error) {
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

  const sqlQuery = `
    SELECT gs.game_id, g.name as game_name, gs.difficulty_id, d.name as difficulty_name, gs.region, gs.score
    FROM game_scores gs
    LEFT JOIN games g ON gs.game_id = g.id
    LEFT JOIN difficulties d ON gs.difficulty_id = d.id
    WHERE gs.user_id = ?
    `;
  const queryParams = [userId];

  db.all(sqlQuery, queryParams, (err, rows) => {
    if (err) {
      console.error("Failed to fetch scores:", err.message);
      return res.status(500).json({ error: "Failed to fetch scores" });
    }

    if (!rows.length) {
      return res
        .status(200)
        .json({ scores: [], message: "No scores found for this user" });
    }

    const scores = rows.reduce((acc, row) => {
      if (!acc[row.game_id]) acc[row.game_id] = { game_name: row.game_name };

      if (row.difficulty_id) {
        if (!acc[row.game_id].difficulties) acc[row.game_id].difficulties = {};
        if (!acc[row.game_id].difficulties[row.difficulty_id])
          acc[row.game_id].difficulties[row.difficulty_id] = {
            difficulty_name: row.difficulty_name,
            scores: [],
          };
        acc[row.game_id].difficulties[row.difficulty_id].scores.push({
          region: row.region,
          score: row.score,
        });
      } else {
        if (!acc[row.game_id].scores) acc[row.game_id].scores = [];
        acc[row.game_id].scores.push({
          score: row.score,
        });
      }

      return acc;
    }, {});

    res.status(200).json({ scores });
  });
});

app.get("/api/leaderboard", async (req, res) => {
  try {
    const sqlQuery = `  
      SELECT gs.game_id, g.name as game_name, gs.user_id, gs.difficulty_id, gs.region
      , MAX(gs.score) as max_score
      FROM game_scores gs
      LEFT JOIN games g ON gs.game_id = g.id  
      GROUP BY gs.game_id, gs.user_id, gs.difficulty_id, gs.region
      ORDER BY gs.game_id, max_score DESC
    `;

    db.all(sqlQuery, [], (err, rows) => {
      if (err) {
        console.error("Failed to fetch leaderboard:", err.message);
        return res.status(500).json({ error: "Failed to fetch leaderboard" });
      }

      if (!rows.length) {
        return res
          .status(200)
          .json({ leaderboard: [], message: "No scores found" });
      }

      const leaderboard = rows.reduce((acc, row) => {
        if (!acc[row.game_id]) acc[row.game_id] = { game_name: row.game_name };

        if (!acc[row.game_id].users) acc[row.game_id].users = [];
        acc[row.game_id].users.push({
          user_id: row.user_id,
          difficulty_id: row.difficulty_id,
          region: row.region,

          max_score: row.max_score,
        });

        return acc;
      }, {});

      res.status(200).json({ leaderboard });
    });
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error.message);
    return res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});