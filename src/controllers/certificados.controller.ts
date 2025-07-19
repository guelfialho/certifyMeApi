import { Request, Response } from "express";
import CertificadosRepository from "../repositories/certificados.repository";
import { getLoggedUser } from "../utils/auth.utils";

async function listarCertificadosDoEstudante(req: Request, res: Response) {
  try {
    const usuario = getLoggedUser(req);

    if (usuario.tipo !== "ESTUDANTE") {
      return res
        .status(403)
        .json({ sucesso: false, mensagem: "Acesso negado." });
    }

    const lista = await CertificadosRepository.listarPorEstudante(usuario.id);
    return res.json({ sucesso: true, certificados: lista });
  } catch (e: any) {
    console.error(e);
    return res.status(401).json({ sucesso: false, mensagem: e.message });
  }
}

export default { listarCertificadosDoEstudante };
