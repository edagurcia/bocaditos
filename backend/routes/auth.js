import express from "express";
import { registrar, autenticar } from "../controllers/auth.js";

const router = express.Router();

// desc:        registrar nuevo usuario
// method:      POST
// route:       publico
router.post("/registrar", registrar);

// desc:        autenticar usuario
// method:      POST
// route:       publico
router.post("/autenticar", autenticar);

export default router;
