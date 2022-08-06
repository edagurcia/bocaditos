import axios from "axios";

const API_URL = "/api/bocaditos";

const obtenerTodos = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const res = await axios.get(API_URL, config);
	return res.data;
};

const obtenerMios = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const res = await axios.get(`${API_URL}/usuario`, config);
	return res.data;
};

const obtenerUno = async (token, idBocadito) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const res = await axios.get(`${API_URL}/${idBocadito}`, config);
	return res.data;
};

const registrar = async (token, formData) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const res = await axios.post(API_URL, formData, config);
	return res.data;
};

const eliminar = async (token, idBocadito) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const res = await axios.delete(`${API_URL}/${idBocadito}`, config);
	return res.data;
};

const toggleFav = async (token, idBocadito) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const res = await axios.put(`${API_URL}/${idBocadito}`, "", config);
	return res.data;
};

const bocaditoService = {
	obtenerTodos,
	obtenerMios,
	obtenerUno,
	registrar,
	eliminar,
	toggleFav,
};

export default bocaditoService;
