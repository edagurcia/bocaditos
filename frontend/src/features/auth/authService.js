import axios from "axios";

const API_URL = "/api/auth";

const autenticar = async (formData) => {
	const res = await axios.post(`${API_URL}/autenticar`, formData);

	if (res.data) {
		localStorage.setItem("bocaditos", JSON.stringify(res.data));
	}

	return res.data;
};

const registrar = async (formData) => {
	const res = await axios.post(`${API_URL}/registrar`, formData);

	if (res.data) {
		localStorage.setItem("bocaditos", JSON.stringify(res.data));
	}

	return res.data;
};

const cerrarSesion = async () => {
	localStorage.removeItem("bocaditos");
};

const authService = { autenticar, registrar, cerrarSesion };
export default authService;
