import { db } from "../db";

async function criarEvento({ titulo, descricao, data, organizador_id }: any) {
  const query = `
    INSERT INTO eventos (titulo, descricao, data, organizador_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const values = [titulo, descricao, data, organizador_id];
  const { rows } = await db.query(query, values);
  return rows[0];
}

async function listarEventos() {
  const query = `SELECT * FROM eventos WHERE deletado_em IS NULL ORDER BY data`;
  const { rows } = await db.query(query);
  return rows;
}

export default {
  criarEvento,
  listarEventos,
};
