import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema(
	{
		usuario: {
			type: String,
			required: true,
			trim: true,
			minLength: [4, "Nombre de usuario muy corto..."],
			maxLength: 15,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minLength: [8, "Contraseña debe ser al menos de 8 caracteres"],
		},
		pais: {
			type: String,
			trim: true,
			defaul: "HN"
		},
		bio: {
			type: String,
			trim: true,
			maxLength: 500,
		},
		redes: {
			twitter: {
				type: String,
				trim: true,
			},
			instagram: {
				type: String,
				trim: true,
			},
			facebook: {
				type: String,
				trim: true,
			},
		},
		publicaciones: [],
		favoritos: [],
	},
	{
		timestamps: true,
	}
);

usuarioSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function (passwordForm) {
	return await bcrypt.compare(passwordForm, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
