import asyncHandlre from "express-async-handler";
import bcrypt from "bcrypt";
import Usuario from "../models/usuario.js";

// obtener el perfil del usuario
const perfil = asyncHandlre(async (req, res) => {
	const usuario = await Usuario.findById(req.usuario._id);

	res.status(200).json({
		usuario: usuario.usuario,
		email: usuario.email,
		pais: usuario.pais,
		bio: usuario.bio,
		redes: usuario.redes,
		publicaciones: usuario.publicaciones,
		favoritos: usuario.favoritos,
	});
});

// editar perfil de usuario
const actualizar = asyncHandlre(async (req, res) => {
	const usuario = await Usuario.findById(req.usuario._id);
	if (!usuario) {
		const error = new Error("Usuario no registrado");
		return res.status(404).json({ msg: error.message });
	}

	usuario.usuario = req.body.usuario || usuario.usuario;
	usuario.pais = req.body.pais || usuario.pais;
	usuario.bio = req.body.bio || usuario.bio;
	usuario.redes.twitter = req.body.twitter || usuario.redes.twitter;
	usuario.redes.instagram = req.body.instagram || usuario.redes.instagram;
	usuario.redes.facebook = req.body.facebook || usuario.redes.facebook;

	try {
		await usuario.save();
		res.status(202).json({
			usuario: usuario.usuario,
			email: usuario.email,
			pais: usuario.pais,
			bio: usuario.bio,
			redes: usuario.redes,
			publicaciones: usuario.publicaciones,
			favoritos: usuario.favoritos,
		});
	} catch (error) {
		console.log(error);
	}
});

// cambiar contraseña
const password = asyncHandlre(async (req, res) => {
	const { oldPassword, newPassword } = req.body;

	const usuario = await Usuario.findById(req.usuario._id);
	if (!usuario) {
		const error = new Error("Usuario no registrado");
		return res.status(404).json({ msg: error.message });
	}

	try {
		const esCorrecto = await bcrypt.compare(oldPassword, usuario.password);
		if (!esCorrecto) {
			const error = new Error("Contraseña incorrecta");
			return res.status(404).json({ msg: error.message });
		}

		usuario.password = newPassword || usuario.password;
		await usuario.save();

		res.status(202).json({ msg: "Contraseña actualizada correctamente" });
	} catch (error) {
		console.log(error);
	}
});

export { perfil, actualizar, password };
