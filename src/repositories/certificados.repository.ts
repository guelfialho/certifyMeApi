import { db } from "../db";
import { CertificadoComEvento } from "../types/certificados.types";

async function listarPorEstudante(
  estudanteId: string
): Promise<CertificadoComEvento[]> {
  const query = `
    SELECT
      e.id AS evento_id,
      e.titulo,
      e.data,
      u.nome AS organizador,
      COALESCE(p.confirmada, false) AS confirmada,
      c.emitido
    FROM certificados c
    JOIN eventos e ON c.evento_id = e.id
    JOIN usuarios u ON e.organizador_id = u.id
    LEFT JOIN presencas p ON p.evento_id = e.id AND p.estudante_id = c.estudante_id
    WHERE c.estudante_id = $1
  `;

  const result = await db.query(query, [estudanteId]);

  return result.rows.map((row) => ({
    evento: {
      id: row.evento_id,
      titulo: row.titulo,
      data: row.data,
      organizador: row.organizador,
    },
    presencaConfirmada: row.confirmada,
    emitido: row.emitido,
  }));
}

export default {
  listarPorEstudante,
};
