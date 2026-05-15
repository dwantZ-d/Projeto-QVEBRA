require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());




app.get("/", (req, res) => {
  res.send("API funcionando!");
});


app.get("/teste-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS resultado");
    res.json(rows);
  } catch (err) {
    console.log("ERRO REAL:", err);
    res.status(500).json({ error: err.message, full: err });
  }
});


app.get("/clientes", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM clientes");
    res.json(rows);
  } catch (err) {
    console.log("ERRO REAL:", err);
    res.status(500).json({ error: err.message, full: err });
  }
});

app.post("/clientes", async (req, res) => {
  const { nome, email, senha, telefone, rua, estado, numero, cidade } = req.body;

  try {
    const [result] = await db.query(
      `INSERT INTO clientes (nome, email, senha, telefone, rua, estado, numero, cidade)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nome, email, senha, telefone, rua, estado, numero, cidade]
    );

    res.json({
      id: result.insertId,
      nome,
      email
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});


app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const [rows] = await db.query(
      "SELECT * FROM clientes WHERE email = ? AND senha = ?",
      [email, senha]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: "Email ou senha inválidos" });
    }

    const user = rows[0];

   
    const { senha: _, ...userSemSenha } = user;

    res.json({
      message: "Login realizado com sucesso",
      user: userSemSenha
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
});

