import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiHome } from "react-icons/bi";
import { BsPersonLinesFill, BsFillLockFill } from "react-icons/bs";
import { device } from "../../helpers/breakPoints";

const Navegador = ({ opcion, setOpcion }) => {
	const navigate = useNavigate();

	return (
		<NavContainer>
			<NavOption onClick={() => navigate("/app")}>
				<BiHome />
				<span>Inicio</span>
			</NavOption>
			<NavOption
				onClick={() => setOpcion("redes")}
				className={opcion === "redes" ? "active" : ""}
			>
				<BsPersonLinesFill />
				<span>Actualizar Perfil</span>
			</NavOption>
			<NavOption
				onClick={() => setOpcion("password")}
				className={opcion === "password" ? "active" : ""}
			>
				<BsFillLockFill />
				<span>Cambiar Contraseña</span>
			</NavOption>
		</NavContainer>
	);
};

const NavContainer = styled.div`
	width: 100%;
	padding: 1rem;
	margin-bottom: 20px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	background: rgba(0, 0, 0, 0.25);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.27);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.18);

	.active {
		color: #f2d1c9;
		font-weight: bolder;
		border-bottom: 1px solid;
	}

	@media ${device.tablet} {
		width: 600px;
	}
`;

const NavOption = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	text-transform: uppercase;
	color: #f2d1c9;

	&:hover {
		font-weight: 400;
		color: #f24444;
		border-bottom: none;
		transition: transform 0.5s ease-in-out;
	}

	span {
		display: none;
	}

	svg {
		margin-right: 10px;
		font-size: 40px;
	}

	@media ${device.tablet} {
		span {
			display: block;
		}
		svg {
			font-size: 20px;
		}
	}
`;

export default Navegador;
