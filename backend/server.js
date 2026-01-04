const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Database
const db = new sqlite3.Database("./db.sqlite", (err) => {
  if (err) console.log(err);
  else console.log("SQLite DB connected");
});

// Create table
db.run(`
  CREATE TABLE IF NOT EXISTS invoices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    invoiceNumber TEXT NOT NULL,
    clientName TEXT NOT NULL,
    date TEXT NOT NULL,
    amount REAL NOT NULL,
    status TEXT NOT NULL
  )
`);
// Users table (for login/signup)
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )
`);

// Routes
app.get("/invoices", (req, res) => {
  db.all("SELECT * FROM invoices", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

app.post("/invoices", (req, res) => {
  const { invoiceNumber, clientName, date, amount, status } = req.body;
  db.run(
    `INSERT INTO invoices (invoiceNumber, clientName, date, amount, status)
     VALUES (?, ?, ?, ?, ?)`,
    [invoiceNumber, clientName, date, amount, status],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID });
    }
  );
});

app.put("/invoices/:id", (req, res) => {
  const { invoiceNumber, clientName, date, amount, status } = req.body;
  db.run(
    `UPDATE invoices SET invoiceNumber=?, clientName=?, date=?, amount=?, status=? WHERE id=?`,
    [invoiceNumber, clientName, date, amount, status, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ updated: true });
    }
  );
});

app.delete("/invoices/:id", (req, res) => {
  db.run(
    "DELETE FROM invoices WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ deleted: true });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
// Signup (Register)
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  db.run(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    [name, email, password],
    function (err) {
      if (err) {
        return res.status(400).json({ message: "Email already exists" });
      }
      res.json({ message: "User registered successfully" });
    }
  );
});
// LOGIN API
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  db.get(
    "SELECT * FROM users WHERE email = ?",
    [email],
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email
        }
      });
    }
  );
});
