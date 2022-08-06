import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { device } from "../../helpers/breakPoints";
import {
	actualizarPassword,
	reset,
} from "../../features/usuarios/usuarioSlice";
import { cerrarSesion } from "../../features/auth/authSlice";
import ControledInput from "../shared/ControledInput";
import { Group, BtnPrimary } from "../../styles/form.elements";

const FormPassword = () => {
	const [values, setValues] = useState({
		newPassword: "",
		oldPassword: "",
	});

	const { isError, isPasswordChanged, mensaje } = useSelector(
		(state) => state.info
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(mensaje);
		}

		if (isPasswordChanged) {
			toast.success("Su contraseña se actualizo con exito");
			dispatch(cerrarSesion());
			dispatch(reset());
		}
	}, [isError, isPasswordChanged, mensaje]);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = {
			newPassword: values.newPassword,
			oldPassword: values.oldPassword,
		};

		dispatch(actualizarPassword(formData));
	};

	return (
		<Form onSubmit={handleSubmit}>
			<ControledInput
				name="newPassword"
				type="password"
				placeholder="Nueva contraseña..."
				errorMessage="La contraseña debe contener de 8 a 20 caracteres y debe incluir al menos una letra mayúscula, un numero y un carácter especial"
				label="Nueva Contraseña"
				pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
				required={true}
				autoComplete="off"
				value={values.username}
				onChange={onChange}
			/>
			<Group>
				<label>Contraseña Actual</label>
				<input
					type="password"
					name="oldPassword"
					placeholder="Su contraseña actual..."
					autoComplete="off"
					value={values.twitter}
					onChange={onChange}
					maxLength={60}
				/>
			</Group>
			<BtnPrimary type="submit">Cambiar Contraseña</BtnPrimary>
		</Form>
	);
};

const Form = styled.form`
	width: 100%;
	padding: 1rem;
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	background: rgba(255, 255, 255, 0.35);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.67);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.18);

	@media ${device.tablet} {
		width: 400px;
	}
`;

export default FormPassword;
