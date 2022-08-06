import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bocaditoService from "./bocaditoService";

const initialState = {
	bocaditos: [],
	bocaditoSelected: null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	isSaved: false,
	isBlocked: false,
	isDeleted: false,
	isAdd: false,
	isFav: false,
	mensaje: "",
};

export const obtenerTodos = createAsyncThunk(
	"bocaditos/todos",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.usuario.token;
			return await bocaditoService.obtenerTodos(token);
		} catch (error) {
			const msg =
				(error.response && error.response.data && error.response.data.msg) ||
				error.msg ||
				error.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const obtenerMios = createAsyncThunk(
	"bocaditos/mios",
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.usuario.token;
			return await bocaditoService.obtenerMios(token);
		} catch (error) {
			const msg =
				(error.response && error.response.data && error.response.data.msg) ||
				error.msg ||
				error.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const obtenerBocadito = createAsyncThunk(
	"bocaditos/bocadito",
	async (idBocadito, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.usuario.token;
			return await bocaditoService.obtenerUno(token, idBocadito);
		} catch (error) {
			const msg =
				(error.response && error.response.data && error.response.data.msg) ||
				error.msg ||
				error.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const agregarBocadito = createAsyncThunk(
	"bocaditos/agregar",
	async (formData, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.usuario.token;
			return await bocaditoService.registrar(token, formData);
		} catch (error) {
			const msg =
				(error.response && error.response.data && error.response.data.msg) ||
				error.msg ||
				error.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const eliminarBocadito = createAsyncThunk(
	"bocaditos/eliminar",
	async (idBocadito, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.usuario.token;
			return await bocaditoService.eliminar(token, idBocadito);
		} catch (error) {
			const msg =
				(error.response && error.response.data && error.response.data.msg) ||
				error.msg ||
				error.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const toggleFav = createAsyncThunk(
	"bocaditos/toggleFav",
	async (idBocadito, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.usuario.token;
			return await bocaditoService.toggleFav(token, idBocadito);
		} catch (error) {
			const msg =
				(error.response && error.response.data && error.response.data.msg) ||
				error.msg ||
				error.toString();
			return thunkAPI.rejectWithValue(msg);
		}
	}
);

export const bocaditoSlice = createSlice({
	name: "feeds",
	initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.isSaved = false;
			state.isBlocked = false;
			state.isDeleted = false;
			state.isAdd = false;
			state.isFav = false;
			state.mensaje = "";
		},
		cleanBocadito: (state) => {
			state.bocaditoSelected = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(obtenerTodos.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(obtenerTodos.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.bocaditos = action.payload;
			})
			.addCase(obtenerTodos.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.mensaje = action.payload;
			})
			.addCase(obtenerMios.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(obtenerMios.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.bocaditos = action.payload;
			})
			.addCase(obtenerMios.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.mensaje = action.payload;
			})
			.addCase(obtenerBocadito.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(obtenerBocadito.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.bocaditoSelected = action.payload;
			})
			.addCase(obtenerBocadito.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.mensaje = action.payload;
			})
			.addCase(agregarBocadito.pending, (state) => {
				state.isLoading = true;
				state.isBlocked = true;
			})
			.addCase(agregarBocadito.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isBlocked = false;
				state.isSaved = true;
				state.bocaditos.push(action.payload);
			})
			.addCase(agregarBocadito.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.mensaje = action.payload;
			})
			.addCase(eliminarBocadito.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(eliminarBocadito.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isDeleted = true;
				state.bocaditos = state.bocaditos.filter(
					(bocaditoState) => bocaditoState._id !== action.payload._id
				);
			})
			.addCase(eliminarBocadito.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.mensaje = action.payload;
			})
			.addCase(toggleFav.fulfilled, (state) => {
				state.isFav = true;
			});
	},
});

export const { reset, cleanBocadito } = bocaditoSlice.actions;
export default bocaditoSlice.reducer;
