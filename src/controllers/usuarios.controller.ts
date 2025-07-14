import { Request, Response } from "express";
import * as UsuarioRepo from "../repositories/usuarios.repository";

export async function cadastrarUsuario(req: Request, res: Response) {
  const { nome, email, senha, tipo } = req.body;
  if (!nome || !email || !senha || !tipo) {
    return res
      .status(400)
      .json({ sucesso: false, mensagem: "Campos obrigatórios ausentes." });
  }

  try {
    const usuario = await UsuarioRepo.criarUsuario(nome, email, senha, tipo);
    return res.json({
      sucesso: true,
      mensagem: "Cadastro realizado com sucesso",
      usuario,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ sucesso: false, mensagem: "Erro no servidor." });
  }
}

export async function loginUsuario(req: Request, res: Response) {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res
      .status(400)
      .json({ sucesso: false, mensagem: "Email e senha são obrigatórios." });
  }

  const usuario = await UsuarioRepo.buscarPorEmailSenha(email, senha);
  if (usuario) {
    return res.json({
      sucesso: true,
      mensagem: "Login bem-sucedido!",
      tipo: usuario.tipo,
      uuid: usuario.uuid,
    });
  } else {
    return res
      .status(401)
      .json({ sucesso: false, mensagem: "Email ou senha inválidos." });
  }
}
