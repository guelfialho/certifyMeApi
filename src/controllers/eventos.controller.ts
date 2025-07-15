import { Request, Response } from "express";
import EventosRepository from "../repositories/eventos.repository";

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

export default {
  criarEvento,
  listarEventos,
};
