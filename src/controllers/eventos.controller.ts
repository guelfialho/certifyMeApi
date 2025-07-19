import { Request, Response } from "express";
import EventosRepository from "../repositories/eventos.repository";
import { getLoggedUser } from "../utils/auth.utils";

async function criarEvento(req: Request, res: Response) {
  const { titulo, descricao, data, organizador_id } = req.body;

  if (!titulo || !data || !organizador_id) {
    return res.status(400).json({ mensagem: "Campos obrigatórios ausentes." });
  }

  const evento = await EventosRepository.criarEvento({
    titulo,
    descricao,
    data,
    organizador_id,
  });
  return res
    .status(201)
    .json({ mensagem: "Evento criado com sucesso", evento });
}

async function listarEventos(_: Request, res: Response) {
  const eventos = await EventosRepository.listarEventos();
  return res.json(eventos);
}

async function inscreverNoEvento(req: Request, res: Response) {
  try {
    const usuario = getLoggedUser(req);

    if (usuario.tipo !== "ESTUDANTE") {
      return res.status(403).json({
        sucesso: false,
        mensagem: "Apenas estudantes podem se inscrever.",
      });
    }

    const { eventoId } = req.body;

    if (!eventoId) {
      return res
        .status(400)
        .json({ sucesso: false, mensagem: "ID do evento é obrigatório." });
    }

    await EventosRepository.inscreverEstudante(eventoId, usuario.id);

    return res.json({
      sucesso: true,
      mensagem: "Inscrição realizada com sucesso!",
    });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({
      sucesso: false,
      mensagem: e.message || "Erro ao se inscrever no evento.",
    });
  }
}

export default {
  criarEvento,
  listarEventos,
  inscreverNoEvento,
};
