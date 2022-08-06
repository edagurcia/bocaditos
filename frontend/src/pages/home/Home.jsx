import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import styled from "styled-components";
import { device } from "../../helpers/breakPoints";
import { PageContainer } from "../../styles/containers.elements";
import Bocadito from "../../components/feed/Bocadito";
import Mensaje from "../../components/shared/Mensaje";
import Logo from "../../components/shared/Logo";
import ModalAdd from "../../components/feed/ModalAdd";
import ModalDetail from "../../components/feed/ModalDetail";
import ButtonAdd from "../../components/feed/ButtonAdd";
import ScrollToTop from "../../components/shared/ScrollToTop";
import Spinner from "../../components/shared/Spinner";
import {
	obtenerTodos,
	reset,
	eliminarBocadito,
	toggleFav,
} from "../../features/bocaditos/bocaditoSlice";
import { obtenerPerfil } from "../../features/usuarios/usuarioSlice";

const Home = () => {
	const [openModal, setOpenModal] = useState(false);
	const [openDetail, setOpenDetail] = useState(false);
	const {
		bocaditos,
		bocaditoSelected,
		isError,
		isLoading,
		mensaje,
		isDeleted,
		isFav,
	} = useSelector((state) => state.feed);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(mensaje);
		}

		dispatch(obtenerTodos());

		return () => {
			dispatch(reset());
		};
	}, [isError, mensaje, dispatch]);

	useEffect(() => {
		if (isDeleted) {
			toast.success("Bocadito eliminado con exito");
			dispatch(obtenerPerfil());
		}

		return () => {
			dispatch(reset());
		};
	}, [isDeleted, dispatch]);

	useEffect(() => {
		if (isFav) {
			dispatch(obtenerPerfil());
			dispatch(obtenerTodos());
		}

		return () => {
			dispatch(reset());
		};
	}, [isFav]);

	const eliminar = (idBocadito) => {
		dispatch(eliminarBocadito(idBocadito));
	};

	const favorito = (idBocadito) => {
		dispatch(toggleFav(idBocadito));
	};

	return (
		<PageContainer>
			<MainContainer>
				<Logo />
				{bocaditos.length === 0 ? (
					<Mensaje mensaje="No hay bocaditos ingresados aún." tipo="error" />
				) : null}
				<Grid>
					{isLoading ? (
						<Spinner />
					) : (
						bocaditos.map((bocadito) => (
							<Bocadito
								key={bocadito._id}
								bocadito={bocadito}
								eliminar={eliminar}
								favorito={favorito}
								setOpenDetail={setOpenDetail}
							/>
						))
					)}
				</Grid>
				<ButtonAdd setOpenModal={setOpenModal} />
				<ModalAdd openModal={openModal} setOpenModal={setOpenModal} />
				<ModalDetail
					bocaditoSelected={bocaditoSelected}
					openDetail={openDetail}
					setOpenDetail={setOpenDetail}
				/>
				<ScrollToTop />
			</MainContainer>
		</PageContainer>
	);
};

const MainContainer = styled.section`
	width: 100%;
	padding: 1rem;
	display: flex;
	flex-direction: column;
`;

const Grid = styled.div`
	display: block;

	@media ${device.laptop} {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}
`;

export default Home;
