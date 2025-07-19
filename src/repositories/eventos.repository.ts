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

async function inscreverEstudante(eventoId: string, estudanteId: string) {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    // Insere na tabela de presenças
    await client.query(
      `INSERT INTO presencas (evento_id, estudante_id)
       VALUES ($1, $2)
       ON CONFLICT (evento_id, estudante_id) DO NOTHING`,
      [eventoId, estudanteId]
    );

    // Insere na tabela de certificados
    await client.query(
      `INSERT INTO certificados (evento_id, estudante_id)
       VALUES ($1, $2)
       ON CONFLICT (evento_id, estudante_id) DO NOTHING`,
      [eventoId, estudanteId]
    );

    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export default {
  criarEvento,
  listarEventos,
  inscreverEstudante,
};
