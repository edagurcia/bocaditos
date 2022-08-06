import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
	AiOutlineLike,
	AiTwotoneLike,
	AiTwotoneDelete,
	AiFillBook,
} from "react-icons/ai";
import { obtenerBocadito } from "../../features/bocaditos/bocaditoSlice";
import noimage from "../../assets/noimage.png";

const Bocadito = ({ bocadito, eliminar, favorito, setOpenDetail }) => {
	const { usuario } = useSelector((state) => state.auth);
	const { bocaditoSelected } = useSelector((state) => state.feed);

	const dispatch = useDispatch();

	useEffect(() => {
		if (bocaditoSelected) {
			setOpenDetail(true);
		}
	}, [bocaditoSelected]);

	const verBocadito = (idBocadito) => {
		dispatch(obtenerBocadito(idBocadito));
	};

	return (
		<Card>
			<img src={bocadito?.foto ? bocadito?.foto : noimage} alt="fotoplato" />
			<h4>{bocadito?.plato}</h4>
			<Descripcion>
				<p>{bocadito?.descripcion}</p>
			</Descripcion>
			<Actions>
				<Gusta>
					{bocadito?.legusta.includes(usuario._id) ? (
						<AiTwotoneLike
							title="Quitar de mis favoritos"
							className="megusta"
							onClick={() => favorito(bocadito._id)}
						/>
					) : (
						<AiOutlineLike
							title="Poner en mis favoritos"
							className="accion"
							onClick={() => favorito(bocadito._id)}
						/>
					)}
					<span>{bocadito?.legusta.length}</span>
				</Gusta>
				<AiFillBook
					title="Ver receta"
					className="accion"
					onClick={() => verBocadito(bocadito._id)}
				/>
				{bocadito?.usuario.toString() === usuario._id.toString() && (
					<AiTwotoneDelete
						title="Eliminar Bocadito"
						className="eliminar"
						onClick={() => eliminar(bocadito._id)}
					/>
				)}
			</Actions>
		</Card>
	);
};

const Card = styled.div`
	width: 100%;
	height: 350px;
	padding: 0.5rem;
	margin-bottom: 10px;
	background-color: #f2f2f2;
	border-radius: 10px;
	img {
		width: 100%;
		height: 200px;
	}
`;

const Descripcion = styled.div`
	width: 255px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	margin-bottom: 50px;
`;

const Actions = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;

	svg {
		font-size: 25px;
		cursor: pointer;
	}

	.eliminar {
		color: #bf0404;

		&:hover {
			color: #f20505;
		}
	}

	.accion {
		color: #f28907;

		&:hover {
			color: #f2a007;
		}
	}

	.megusta {
		color: #304269;

		&:hover {
			color: #91bed4;
		}
	}
`;

const Gusta = styled.div`
	display: flex;
	align-items: center;

	span {
		font-size: 15px;
		font-weight: bold;
		margin-left: 10px;
		color: #304269;
	}
`;

export default Bocadito;
