import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";
import { MdDynamicFeed } from "react-icons/md";
import { BiLike, BiEdit } from "react-icons/bi";
import { device } from "../../helpers/breakPoints";
import { toast } from "react-toastify";
import Avatar from "../shared/Avatar";
import { cerrarSesion } from "../../features/auth/authSlice";
import { obtenerPerfil, reset } from "../../features/usuarios/usuarioSlice";

const UserCard = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { perfil, isError, mensaje } = useSelector((state) => state.info);

	useEffect(() => {
		if (isError) {
			toast.error(mensaje);
		}
		dispatch(obtenerPerfil());

		return () => {
			dispatch(reset());
		};
	}, [isError, mensaje, dispatch]);

	const handleLogout = () => {
		dispatch(cerrarSesion());
	};

	const goPerfil = () => {
		navigate("/app/perfil");
	};

	return (
		<Card>
			<Avatar>{perfil?.usuario.charAt(0)}</Avatar>

			<h4 title="Editar Perfil" onClick={() => goPerfil()}>
				{perfil?.usuario} <BiEdit />
			</h4>
			<p>{perfil?.email}</p>

			<SocialDiv>
				{perfil?.redes?.twitter && (
					<a
						href={perfil?.redes?.twitter}
						target="_blank"
						rel="noopener noreferrer"
					>
						<BsTwitter title="Twitter" />
					</a>
				)}
				{perfil?.redes?.facebook && (
					<a
						href={perfil?.redes?.facebook}
						target="_blank"
						rel="noopener noreferrer"
					>
						<BsFacebook title="Facebook" />
					</a>
				)}
				{perfil?.redes?.instagram && (
					<a
						href={perfil?.redes?.instagram}
						target="_blank"
						rel="noopener noreferrer"
					>
						<BsInstagram title="Instagram" />
					</a>
				)}
			</SocialDiv>
			<Counters>
				<div title="Favoritos">
					<BiLike /> <span>{perfil?.favoritos.length}</span>
				</div>
				<div title="Mis Publicaciones">
					<MdDynamicFeed /> <span>{perfil?.publicaciones.length}</span>
				</div>
			</Counters>
			<BtnLogout type="button" onClick={handleLogout}>
				Cerrar Sesión
			</BtnLogout>
		</Card>
	);
};

const Card = styled.div`
	display: none;
	@media ${device.laptop} {
		width: 350px;
		height: 350px;
		flex: 2;
		position: sticky;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.35);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.67);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border-radius: 10px;
		border: 1px solid rgba(255, 255, 255, 0.18);

		h4 {
			display: flex;
			align-items: center;
			cursor: pointer;
			color: #595959;

			&:hover {
				color: #262626;
			}

			svg {
				font-size: 25px;
				margin-left: 10px;
			}
		}
	}
`;

const SocialDiv = styled.div`
	width: 100%;
	margin-top: 2rem;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	svg {
		font-size: 30px;
	}
`;

const Counters = styled.div`
	display: flex;
	gap: 1rem;
	margin-top: 2rem;
	margin-bottom: 2rem;

	div {
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		cursor: pointer;
	}

	svg {
		font-size: 25px;
	}

	span {
		font-size: 1rem;
		font-weight: 500;
		margin-left: 10px;
	}
`;

const BtnLogout = styled.button`
	width: 140px;
	height: 40px;
	border: none;
	border-radius: 10px;
	background-color: #595959;
	color: white;
	text-transform: uppercase;

	&:hover {
		cursor: pointer;
		background-color: #262626;
	}
`;

export default UserCard;
