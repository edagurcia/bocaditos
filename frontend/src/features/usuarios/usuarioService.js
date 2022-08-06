import axios from "axios";

const API_URL = "/api/usuario";

const perfil = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const res = await axios.get(API_URL, config);
	return res.data;
};

const actualizar = async (token, formData) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const res = await axios.put(`${API_URL}/actualizar`, formData, config);
	return res.data;
};

const password = async (token, formData) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const res = await axios.put(`${API_URL}/password`, formData, config);
	return res.data;
};

const usuarioService = {
	perfil,
	actualizar,
	password,
};

export default usuarioService;
