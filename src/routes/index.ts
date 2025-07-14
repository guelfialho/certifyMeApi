import { Router } from "express";
import * as UsuarioController from "../controllers/usuarios.controller";
// (Importar os outros controllers em seguida...)

const router = Router();

// Usuários
router.post("/usuarios", UsuarioController.cadastrarUsuario);
router.post("/login", UsuarioController.loginUsuario);

export default router;
