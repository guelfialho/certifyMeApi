import { db } from "../db";

export async function criarUsuario(
  nome: string,
  email: string,
  senha: string,
  tipo: string
) {
  const query = `
    INSERT INTO usuarios (nome, email, senha, tipo)
    VALUES ($1, $2, $3, $4)
    RETURNING uuid, nome, email, tipo
  `;
  const values = [nome, email, senha, tipo];
  const { rows } = await db.query(query, values);
  return rows[0];
}

export async function buscarPorEmailSenha(email: string, senha: string) {
  const query = `
    SELECT uuid, nome, email, tipo
    FROM usuarios
    WHERE email = $1 AND senha = $2 AND deletado_em IS NULL
  `;
  const { rows } = await db.query(query, [email, senha]);
  return rows[0];
}
