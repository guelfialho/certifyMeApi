import { Request, Response } from "express";
import PresencasRepository from "../repositories/presencas.repository";

async function confirmarPresenca(req: Request, res: Response) {
  const { eventoId, estudanteId } = req.body;

  if (!eventoId || !estudanteId) {
    return res.status(400).json({ mensagem: "Campos obrigatórios ausentes." });
  }

  try {
    const presencaAtualizada = await PresencasRepository.confirmarPresenca(
      eventoId,
      estudanteId
    );

    if (presencaAtualizada) {
      return res.status(200).json({
        mensagem: "Presença confirmada.",
        presenca: presencaAtualizada,
      });
    } else {
      return res.status(404).json({
        mensagem:
          "Presença não encontrada para confirmação ou já estava confirmada.",
      });
    }
  } catch (error: any) {
    console.error("Erro no controlador ao confirmar presença:", error);
    return res.status(500).json({
      mensagem:
        error.message || "Erro interno do servidor ao confirmar presença.",
    });
  }
}

export default {
  confirmarPresenca,
};
