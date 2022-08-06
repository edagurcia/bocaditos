import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import { perfil, actualizar, password } from "../controllers/usuario.js";

const router = express.Router();

// desc:        perfil de usuario
// method:      GET
// route:       privado
router.get("/", checkAuth, perfil);

// desc:        editar perfil usuario
// method:      PUT
// route:       privado
router.put("/actualizar", checkAuth, actualizar);

// desc:        cambiar contraseña
// method:      PUT
// route:       privado
router.put("/password", checkAuth, password);

export default router;
