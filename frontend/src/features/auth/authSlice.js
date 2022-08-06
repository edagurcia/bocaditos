import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const usuario = JSON.parse(localStorage.getItem("bocaditos"));

const initialState = {
	usuario: usuario ? usuario : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	mensaje: "",
};

export const autenticar = createAsyncThunk(
	"auth/autenticar",
	async (formData, thunkAPI) => {
		try {
			return await authService.autenticar(formData);
		} catch (error) {
			const msg =
				(error.response && error.response.data && error.response.data.msg) ||
				error.msg ||
				error.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const registrar = createAsyncThunk(
	"auth/registrar",
	async (formData, thunkAPI) => {
		try {
			return await authService.registrar(formData);
		} catch (error) {
			const msg =
				(error.response && error.response.data && error.response.data.msg) ||
				error.msg ||
				error.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const cerrarSesion = createAsyncThunk("auth/cerrarSesion", async () => {
	await authService.cerrarSesion();
});

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.mensaje = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(autenticar.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(autenticar.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.usuario = action.payload;
			})
			.addCase(autenticar.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.mensaje = action.payload;
			})
			.addCase(registrar.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registrar.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.usuario = action.payload;
			})
			.addCase(registrar.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.mensaje = action.payload;
			})
			.addCase(cerrarSesion.fulfilled, (state) => {
				state.usuario = null;
			});
	},
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
