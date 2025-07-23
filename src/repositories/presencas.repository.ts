import { db } from "../db";

class PresencasRepository {
  /**
   * Atualiza o status 'confirmada' de uma presença para TRUE,
   * buscando pela combinação de evento_id e estudante_id.
   *
   * @param eventoId O UUID do evento.
   * @param estudanteId O UUID do estudante.
   * @returns Retorna a presença atualizada ou null se não encontrada/atualizada.
   */
  async confirmarPresenca(eventoId: string, estudanteId: string) {
    try {
      const result = await db.query(
        `
        UPDATE presencas
        SET confirmada = TRUE, atualizado_em = NOW()
        WHERE evento_id = $1 AND estudante_id = $2 AND deletado_em IS NULL
        RETURNING *;
        `,
        [eventoId, estudanteId]
      );

      if (result && result.rowCount && result.rowCount > 0) {
        return result.rows[0]; // Retorna a presença atualizada
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao confirmar presença:", error);
      throw new Error("Não foi possível confirmar a presença.");
    }
  }
}

export default new PresencasRepository();
