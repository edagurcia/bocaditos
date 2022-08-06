export const inputFormStep1Rules = [
	{
		id: 1,
		name: "username",
		type: "text",
		placeholder: "Nombre de usuario...",
		errorMessage:
			"El nombre de usuario debe contener de 3 a 16 caracteres y no debe incluir ningún carácter especial",
		label: "Usuario",
		pattern: "^[A-Za-z0-9]{3,16}$",
		required: true,
		autoComplete: "off",
	},
	{
		id: 2,
		name: "email",
		type: "email",
		placeholder: "Correo Electrónico...",
		errorMessage: "Provea una cuenta de correo valida",
		label: "Correo",
		pattern:
			"^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
		required: true,
		autoComplete: "off",
	},
];
