import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import usuarioReducer from "./usuarios/usuarioSlice";
import bocaditoReducer from "./bocaditos/bocaditoSlice";

export const store = configureStore({
	reducer: {
		auth: authReducer,
		info: usuarioReducer,
		feed: bocaditoReducer,
	},
});
