import mongoose from "mongoose";

const bocaditoSchema = mongoose.Schema(
	{
		plato: {
			type: String,
			required: true,
			trim: true,
			minLength: 5,
		},
		descripcion: {
			type: String,
			required: true,
			trim: true,
			maxLength: 500,
		},
		categorias: [],
		ingredientes: [],
		preparacion: {
			type: String,
			required: true,
			trim: true,
			maxLength: 1500,
		},
		foto: {
			type: String,
		},
		legusta: [],
		usuario: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Usuario",
		},
	},
	{
		timestamps: true,
	}
);

const Bocadito = mongoose.model("Bocadito", bocaditoSchema);
export default Bocadito;
