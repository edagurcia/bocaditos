import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContainer, Link, Title } from "../../styles/auth.elements";
import { Group, BtnPrimary } from "../../styles/form.elements";
import { autenticar, reset } from "../../features/auth/authSlice";
import Spinner from "../../components/shared/Spinner";

const Login = () => {
	const [values, setValues] = useState({
		email: "",
		password: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { usuario, isError, isLoading, isSuccess, mensaje } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError) {
			toast.error(mensaje);
		}

		if (usuario || isSuccess) {
			navigate("/app");
		}

		return () => {
			dispatch(reset());
		};
	}, [usuario, isError, isSuccess, mensaje, dispatch, navigate]);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (values.email.trim() === "" || values.password.trim() === "") {
			toast.error("Por favor provea sus credenciales para ingresar");
			return;
		}

		const dataForm = {
			email: values.email,
			password: values.password,
		};

		dispatch(autenticar(dataForm));
	};

	if (isLoading) return <Spinner />;

	return (
		<LoginContainer>
			<Title>Bocaditos</Title>

			<form onSubmit={handleSubmit}>
				<Group>
					<label>Usuario</label>
					<input
						type="email"
						name="email"
						placeholder="Su usuario..."
						autoComplete="off"
						value={values.email}
						onChange={onChange}
					/>
				</Group>
				<Group>
					<label>Contraseña</label>
					<input
						type="password"
						name="password"
						placeholder="Su contraseña..."
						autoComplete="off"
						value={values.password}
						onChange={onChange}
					/>
				</Group>
				<BtnPrimary type="submit">Entrar</BtnPrimary>
			</form>
			<Link to="/register">¿No tiene una cuenta? Registrese aquí</Link>
		</LoginContainer>
	);
};

export default Login;
