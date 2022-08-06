import asyncHandler from "express-async-handler";
import Usuario from "../models/usuario.js";
import generarJWT from "../middleware/generarJWT.js";

// registrar nuevo usuario
const registrar = asyncHandler(async (req, res) => {
	const { email } = req.body;

	const existeUsuario = await Usuario.findOne({ email });
	if (existeUsuario) {
		const error = new Error("Usuario ya registrado");
		return res.status(403).json({ msg: error.message });
	}

	try {
		const usuarioInfo = {};

		if (req.body.usuario) usuarioInfo.usuario = req.body.usuario;
		if (req.body.email) usuarioInfo.email = req.body.email;
		if (req.body.password) usuarioInfo.password = req.body.password;
		if (req.body.pais) usuarioInfo.pais = req.body.pais;
		if (req.body.bio) usuarioInfo.bio = req.body.bio;
		usuarioInfo.redes = {};
		if (req.body.twitter) usuarioInfo.redes.twitter = req.body.twitter;
		if (req.body.instagram) usuarioInfo.redes.instagram = req.body.instagram;
		if (req.body.facebook) usuarioInfo.redes.facebook = req.body.facebook;

		const nuevoUsuario = new Usuario(usuarioInfo);
		await nuevoUsuario.save();

		res.status(201).json({
			_id: nuevoUsuario._id,
			usuario: nuevoUsuario.usuario,
			token: generarJWT(nuevoUsuario._id),
		});
	} catch (error) {
		console.log(error);
	}
});

// autenticar usuario
const autenticar = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const usuario = await Usuario.findOne({ email });
	if (!usuario) {
		const error = new Error("Credenciales no validas");
		return res.status(403).json({ msg: error.message });
	}

	if (await usuario.comprobarPassword(password)) {
		res.status(200).json({
			_id: usuario._id,
			usuario: usuario.usuario,
			token: generarJWT(usuario._id),
		});
	} else {
		const error = new Error("Credenciales no validas");
		return res.status(403).json({ msg: error.message });
	}
});

export { registrar, autenticar };
