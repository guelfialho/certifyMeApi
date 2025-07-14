import express from "express";
import cors from "cors";
import { db } from "./db";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const result = await db.query("SELECT NOW()");
  res.send(`API CertifyMe no ar! Hora do banco: ${result.rows[0].now}`);
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
