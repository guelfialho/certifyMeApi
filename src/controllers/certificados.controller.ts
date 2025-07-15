import { Request, Response } from "express";
import CertificadosRepository from "../repositories/certificados.repository";

async function emitirCertificado(req: Request, res: Response) {
  const { evento_id, estudante_id } = req.body;

  if (!evento_id || !estudante_id) {
    return res.status(400).json({ mensagem: "Campos obrigatórios ausentes." });
  }

  const cert = await CertificadosRepository.emitirCertificado(
    evento_id,
    estudante_id
  );
  return res
    .status(201)
    .json({ mensagem: "Certificado emitido.", certificado: cert });
}

export default {
  emitirCertificado,
};
