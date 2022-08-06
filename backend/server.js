import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import colors from "colors";
import { errorHandler } from "./middleware/errorHandler.js";
import connectDB from "./database/db.js";
import authRoute from "./routes/auth.js";
import usuarioRoute from "./routes/usuario.js";
import bocaditoRoute from "./routes/bocadito.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
connectDB();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/usuario", usuarioRoute);
app.use("/api/bocaditos", bocaditoRoute);

// iniciar frontend en produccion
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(
			path.resolve(__dirname, "../", "frontend", "dist", "index.html")
		);
	});
} else {
	app.get("/", (req, res) => res.send("Por favor configurar para producción"));
}

// manejo de errores
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Servidor en puerto ${port}`.blue.underline);
});
