import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import usuarioService from "./usuarioService";

const initialState = {
	perfil: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	isPasswordChanged: false,
	mensaje: "",
};

export const obtenerPerfil = createAsyncThunk(
	"usuario/perfil",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.usuario.token;
			return await usuarioService.perfil(token);
		} catch (error) {
			const msg =
				(error.response && error.response.data && error.response.data.msg) ||
				error.msg ||
				error.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const actualizarPerfil = createAsyncThunk(
	"usuario/actualizar",
	async (formData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.usuario.token;
			return await usuarioService.actualizar(token, formData);
		} catch (error) {
			const msg =
				(error.response && error.response.data && error.response.data.msg) ||
				error.msg ||
				error.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const actualizarPassword = createAsyncThunk(
	"usuario/password",
	async (formData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.usuario.token;
			return await usuarioService.password(token, formData);
		} catch (error) {
			const msg =
				(error.response && error.response.data && error.response.data.msg) ||
				error.msg ||
				error.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const usuarioSlice = createSlice({
	name: "info",
	initialState,
	reducers: {
		reset: (state) => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(obtenerPerfil.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(obtenerPerfil.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.perfil = action.payload;
			})
			.addCase(obtenerPerfil.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.mensaje = action.payload;
			})
			.addCase(actualizarPerfil.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(actualizarPerfil.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.perfil = action.payload;
			})
			.addCase(actualizarPerfil.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.mensaje = action.payload;
			})
			.addCase(actualizarPassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(actualizarPassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isPasswordChanged = true;
			})
			.addCase(actualizarPassword.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.mensaje = action.payload;
			});
	},
});

export const { reset } = usuarioSlice.actions;
export default usuarioSlice.reducer;
