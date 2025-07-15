import { Router } from "express";
import UsuarioController from "../controllers/usuarios.controller";
import autenticarToken from "../middlewares/auth.middleware";

const router = Router();

// Rota pública
router.post("/login", UsuarioController.loginUsuario);
router.post("/usuarios/cadastro", UsuarioController.cadastrarUsuario);

// Rota protegida
router.get("/protegida", autenticarToken, (req, res) => {
  res.json({ mensagem: "Você acessou uma rota protegida!" });
});

export default router;
