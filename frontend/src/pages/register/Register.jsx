import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	BsSkipBackwardCircleFill,
	BsSkipForwardCircleFill,
} from "react-icons/bs";
import {
	RegisterContainer,
	Link,
	Title,
	StepperButtons,
	StepperContainer,
} from "../../styles/auth.elements";
import { BtnPrimary } from "../../styles/form.elements";
import FormStep1 from "./FormStep1";
import FormStep2 from "./FormStep2";
import FormStep3 from "./FormStep3";
import FormStep4 from "./FormStep4";
import Spinner from "../../components/shared/Spinner";
import { registrar, reset } from "../../features/auth/authSlice";

const Register = () => {
	const [step, setStep] = useState(1);
	const [bloqueadoSig, setBloqueadoSig] = useState(false);
	const [bloqueadoAnt, setBloqueadoAnt] = useState(false);
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
		twitter: "",
		facebook: "",
		instagram: "",
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { usuario, isSuccess, isLoading, isError, mensaje } = useSelector(
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
	}, [usuario, isSuccess, isError, mensaje, dispatch, navigate]);

	useEffect(() => {
		if (step === 1) {
			setBloqueadoAnt(true);
		} else {
			setBloqueadoAnt(false);
		}
		if (step === 4) {
			setBloqueadoSig(true);
		} else {
			setBloqueadoSig(false);
		}
	}, [step]);

	const onChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleAnt = () => {
		let stepper = step - 1;
		setStep(stepper);
	};

	const handleSig = () => {
		let stepper = step + 1;
		setStep(stepper);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			values.username.trim() === "" ||
			values.email.trim() === "" ||
			values.password.trim() === ""
		) {
			toast.error("Por favor provea suinformación completa");
			return;
		}

		if (values.password !== values.confirmPassword) {
			toast.error("Contraseñas no son iguales");
			return;
		}

		const formData = {
			usuario: values.username,
			email: values.email,
			password: values.password,
			twitter: values.twitter,
			instagram: values.instagram,
			facebook: values.facebook,
		};

		dispatch(registrar(formData));
	};

	if (isLoading) return <Spinner />;
	return (
		<RegisterContainer>
			<Title>Bocaditos</Title>
			<StepperContainer>
				<span />
				<div className={step === 1 ? "active" : ""}>
					<p>1</p>
				</div>
				<span />
				<div className={step === 2 ? "active" : ""}>
					<p>2</p>
				</div>
				<span />
				<div className={step === 3 ? "active" : ""}>
					<p>3</p>
				</div>
				<span />
				<div className={step === 4 ? "active" : ""}>
					<p>4</p>
				</div>
				<span />
			</StepperContainer>
			<form onSubmit={handleSubmit}>
				{step === 1 && <FormStep1 values={values} onChange={onChange} />}
				{step === 2 && <FormStep2 values={values} onChange={onChange} />}
				{step === 3 && <FormStep3 values={values} onChange={onChange} />}
				{step === 4 && <FormStep4 values={values} onChange={onChange} />}
				{step === 4 && <BtnPrimary type="submit">Registrar</BtnPrimary>}
				<StepperButtons>
					<button type="button" onClick={handleAnt} disabled={bloqueadoAnt}>
						<BsSkipBackwardCircleFill />
					</button>
					<button type="button" onClick={handleSig} disabled={bloqueadoSig}>
						<BsSkipForwardCircleFill />
					</button>
				</StepperButtons>
			</form>
			<Link to="/">¿Ya tiene una cuenta? Ingrese aquí</Link>
		</RegisterContainer>
	);
};

export default Register;
