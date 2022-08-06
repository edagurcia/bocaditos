export const inputFormStep2Rules = [
	{
		id: 1,
		name: "password",
		type: "password",
		placeholder: "Contraseña...",
		errorMessage:
			"La contraseña debe contener de 8 a 20 caracteres y debe incluir al menos una letra mayúscula, un numero y un carácter especial",
		label: "Contraseña",
		pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
		required: true,
		autoComplete: "off",
	},
	{
		id: 2,
		name: "confirmPassword",
		type: "password",
		placeholder: "Confirme Contraseña...",
		label: "Confirme Contraseña",
		required: true,
		autoComplete: "off",
	},
];
