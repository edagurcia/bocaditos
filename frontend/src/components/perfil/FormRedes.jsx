import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { device } from "../../helpers/breakPoints";
import { actualizarPerfil } from "../../features/usuarios/usuarioSlice";
import ControledInput from "../shared/ControledInput";
import { Group, BtnPrimary } from "../../styles/form.elements";
import Spinner from "../shared/Spinner";

const FormRedes = () => {
	const [values, setValues] = useState({
		username: "",
		twitter: "",
		facebook: "",
		instagram: "",
	});

	const { perfil, isSuccess, isLoading, isError, mensaje } = useSelector(
		(state) => state.info
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(mensaje);
		}

		if (perfil) {
			setValues({
				username: perfil.usuario,
				twitter: perfil?.redes?.twitter,
				facebook: perfil?.redes?.facebook,
				instagram: perfil?.redes?.instagram,
			});
		}
	}, [perfil, isSuccess, isError, mensaje, dispatch]);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (values.username === "") {
			toast.error("El nombre de usuario es obligatorio");
			return;
		}

		const formData = {
			usuario: values.username,
			twitter: values.twitter,
			instagram: values.instagram,
			facebook: values.facebook,
		};

		dispatch(actualizarPerfil(formData));
	};

	if (isLoading) return <Spinner />;

	return (
		<Form onSubmit={handleSubmit}>
			<ControledInput
				name="username"
				type="text"
				placeholder="Nombre de usuario..."
				errorMessage="El nombre de usuario debe contener de 3 a 16 caracteres y no debe incluir ningún carácter especial"
				label="Usuario"
				pattern="^[A-Za-z0-9]{3,16}$"
				required={true}
				autoComplete="off"
				value={values.username}
				onChange={onChange}
			/>
			<Group>
				<label>Twitter</label>
				<input
					type="text"
					name="twitter"
					placeholder="https://twitter.com/usuario"
					autoComplete="off"
					value={values.twitter}
					onChange={onChange}
					maxLength={60}
				/>
			</Group>
			<Group>
				<label>Facebook</label>
				<input
					type="text"
					name="facebook"
					placeholder="https://facebook.com/usuario"
					autoComplete="off"
					value={values.facebook}
					onChange={onChange}
					maxLength={60}
				/>
			</Group>
			<Group>
				<label>Instagram</label>
				<input
					type="text"
					name="instagram"
					placeholder="https://instagram.com/usuario"
					autoComplete="off"
					value={values.instagram}
					onChange={onChange}
					maxLength={60}
				/>
			</Group>
			<BtnPrimary type="submit">Actualizar</BtnPrimary>
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

export default FormRedes;
