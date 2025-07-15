import { db } from "../db";

async function emitirCertificado(evento_id: string, estudante_id: string) {
  const query = `
    INSERT INTO certificados (evento_id, estudante_id, emitido)
    VALUES ($1, $2, true)
    RETURNING *
  `;
  const { rows } = await db.query(query, [evento_id, estudante_id]);
  return rows[0];
}

export default {
  emitirCertificado,
};
