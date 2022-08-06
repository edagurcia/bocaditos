import express from "express";
import checkAuth from "../middleware/checkAuth.js";
import {
	listarBocaditos,
	listarMisBocaditos,
	verBocadito,
	agregar,
	eliminar,
	toggleFavorito,
} from "../controllers/bocadito.js";

const router = express.Router();

// desc:        listar todos
// method:      GET
// route:       privado
router.get("/", checkAuth, listarBocaditos);

// desc:        listar mis
// method:      GET
// route:       privado
router.get("/usuario", checkAuth, listarMisBocaditos);

// desc:        ver
// method:      GET
// route:       privado
router.get("/:idBocadito", checkAuth, verBocadito);

// desc:        agregar
// method:      POST
// route:       privado
router.post("/", checkAuth, agregar);

// desc:        eliminar
// method:      DELETE
// route:       privado
router.delete("/:idBocadito", checkAuth, eliminar);

// desc:        favorito
// method:      PUT
// route:       privado
router.put("/:idBocadito", checkAuth, toggleFavorito);

export default router;
