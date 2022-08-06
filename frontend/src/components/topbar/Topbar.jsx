import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BiLogOut } from "react-icons/bi";
import { device } from "../../helpers/breakPoints";
import { cerrarSesion } from "../../features/auth/authSlice";
import {
	cleanFeed,
	cleanBocadito,
	reset,
} from "../../features/bocaditos/bocaditoSlice";

const Topbar = () => {
	const { usuario } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(cleanBocadito());
		dispatch(cleanFeed());
		dispatch(reset());
		dispatch(cerrarSesion());
	};

	return (
		<Header>
			<Avatar onClick={() => navigate("/app/perfil")}>
				<span>{usuario.usuario.charAt(0)}</span>
			</Avatar>
			<BiLogOut onClick={() => logout()} />
		</Header>
	);
};

const Header = styled.header`
	width: 100%;
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;

	svg {
		font-size: 40px;
		color: #f24444;

		&:hover {
			cursor: pointer;
		}
	}

	@media ${device.laptop} {
		display: none;
	}
`;

const Avatar = styled.div`
	width: 3rem;
	height: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: #f24444;
	color: #f2d1c9;
	font-size: 35px;
	font-weight: bold;
`;

export default Topbar;
