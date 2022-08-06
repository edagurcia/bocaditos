import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import Usuario from "../models/usuario.js";
import Bocadito from "../models/bocadito.js";

// listar todos los bocadillos
const listarBocaditos = asyncHandler(async (req, res) => {
	const bocaditos = await Bocadito.find();
	try {
		res.status(200).json(bocaditos);
	} catch (error) {
		console.log(error);
	}
});

// listar bocadillos por usuario
const listarMisBocaditos = asyncHandler(async (req, res) => {
	const bocaditos = Bocadito.find({ usuario: req.usuario._id });
	try {
		res.status(200).json(bocaditos);
	} catch (error) {
		console.log(error);
	}
});

// ver detalle de bocadillo
const verBocadito = asyncHandler(async (req, res) => {
	const { idBocadito } = req.params;

	if (!mongoose.Types.ObjectId.isValid(idBocadito))
		return res.status(404).send("No existe ese bocadito");

	const bocadito = await Bocadito.findById(idBocadito);
	if (!bocadito) {
		const error = new Error("No existe");
		return res.status(404).json({ msg: error.message });
	}

	try {
		res.status(200).json(bocadito);
	} catch (error) {
		console.log(error);
	}
});

// registrar bocadillo
const agregar = asyncHandler(async (req, res) => {
	try {
		const nuevoBocadito = new Bocadito(req.body);
		nuevoBocadito.usuario = req.usuario._id;

		const usuario = await Usuario.findById(req.usuario._id);
		usuario.publicaciones.push(nuevoBocadito._id.toString());

		await Promise.all([await nuevoBocadito.save(), await usuario.save()]);

		res.status(201).json(nuevoBocadito);
	} catch (error) {
		console.log(error);
	}
});

// eliminar bocadillo
const eliminar = asyncHandler(async (req, res) => {
	const { idBocadito } = req.params;

	if (!mongoose.Types.ObjectId.isValid(idBocadito))
		return res.status(404).send("No existe ese bocadito");

	const bocadito = await Bocadito.findById(idBocadito);
	if (!bocadito) {
		const error = new Error("No existe");
		return res.status(404).json({ msg: error.message });
	}

	if (bocadito.usuario.toString() !== req.usuario._id.toString()) {
		const error = new Error("No autorizado a eliminar");
		return res.status(404).json({ msg: error.message });
	}

	const usuario = await Usuario.findById(req.usuario._id);

	if (usuario.publicaciones.includes(idBocadito.toString())) {
		usuario.publicaciones.pull(idBocadito);
	}

	if (usuario.favoritos.includes(idBocadito.toString())) {
		usuario.favoritos.pull(idBocadito);
	}

	if (bocadito.legusta.includes(req.usuario._id.toString())) {
		usuario.favoritos.pull(idBocadito);
	}

	try {
		await Promise.all([
			await usuario.save(),
			await Bocadito.findByIdAndRemove(idBocadito),
		]);
		res.status(201).json({ _id: idBocadito });
	} catch (error) {
		console.log(error);
	}
});

// toggle favorito
const toggleFavorito = asyncHandler(async (req, res) => {
	const { idBocadito } = req.params;

	if (!mongoose.Types.ObjectId.isValid(idBocadito))
		return res.status(404).send("No existe ese bocadito");

	const bocadito = await Bocadito.findById(idBocadito);
	if (!bocadito) {
		const error = new Error("No existe");
		return res.status(404).json({ msg: error.message });
	}

	const usuario = await Usuario.findById(req.usuario._id);

	if (bocadito.legusta.includes(req.usuario._id.toString())) {
		usuario.favoritos.pull(idBocadito);
		bocadito.legusta.pull(req.usuario._id);
	} else {
		usuario.favoritos.push(idBocadito);
		bocadito.legusta.push(req.usuario._id);
	}

	try {
		await Promise.all([await usuario.save(), await bocadito.save()]);
		res.status(201).json({ _id: idBocadito });
	} catch (error) {
		console.log(error);
	}
});

export {
	listarBocaditos,
	listarMisBocaditos,
	verBocadito,
	agregar,
	eliminar,
	toggleFavorito,
};
