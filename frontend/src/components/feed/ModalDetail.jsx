import { useDispatch } from "react-redux";
import styled from "styled-components";
import { MdOutlineClose } from "react-icons/md";
import { device } from "../../helpers/breakPoints";
import { cleanBocadito } from "../../features/bocaditos/bocaditoSlice";
import noimage from "../../assets/noimage.png";

const ModalDetail = ({ setOpenDetail, openDetail, bocaditoSelected }) => {
	const dispatch = useDispatch();

	const cerrarModal = () => {
		setOpenDetail(false);
		dispatch(cleanBocadito());
	};

	return (
		<>
			{openDetail && (
				<ModalBlock>
					<ModalOverlay />
					<ModalContainer>
						<ModalHeader>
							<ModalTitle>Receta de Bocadito</ModalTitle>
							<ModalClose onClick={cerrarModal}>
								<MdOutlineClose style={{ fontSize: "20px" }} />
							</ModalClose>
						</ModalHeader>
						<ModalBody>
							<Card>
								<h4>
									{bocaditoSelected?.plato}{" "}
									<small>Les Gusta {bocaditoSelected?.legusta.length}</small>
								</h4>
								<img
									src={
										bocaditoSelected?.foto ? bocaditoSelected?.foto : noimage
									}
									alt="fotoplato"
								/>
								<Descripcion>
									<p>{bocaditoSelected?.descripcion}</p>
								</Descripcion>
								<Grid>
									{bocaditoSelected?.categorias.map((cat, index) => (
										<p key={index}>{`#${cat}`}</p>
									))}
								</Grid>
								<h4>Ingredientes / Preparación</h4>
								<Grid>
									{bocaditoSelected?.ingredientes.map((cat, index) => (
										<p key={index}>{`${cat}`}</p>
									))}
								</Grid>
								<Descripcion>
									<p>{bocaditoSelected?.preparacion}</p>
								</Descripcion>
							</Card>
						</ModalBody>
					</ModalContainer>
				</ModalBlock>
			)}
		</>
	);
};

const ModalBlock = styled.div`
	align-items: center;
	bottom: 0;
	justify-content: center;
	left: 0;
	overflow: hidden;
	padding: 0.4rem;
	position: fixed;
	right: 0;
	top: 0;
	display: flex;
	opacity: 1;
	z-index: 9999;
`;

const ModalOverlay = styled.a`
	background: rgba(255, 255, 255, 0.75);
	bottom: 0;
	cursor: default;
	display: block;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
`;

const ModalClose = styled.a`
	float: right !important;
	text-decoration: none !important;
	cursor: pointer;
	font-size: 1rem;
`;

const ModalContainer = styled.div`
	width: 100%;
	height: 550px;
	background: #ffffff;
	border-radius: 0.1rem;
	display: flex;
	flex-direction: column;
	padding: 0 0.8rem;
	animation: slide-down 0.2s ease 1;
	z-index: 1;
	box-shadow: 0 0.2rem 0.5rem rgba(48, 55, 66, 0.3);

	@media ${device.tablet} {
		width: 450px;
		height: 600px;
	}
`;

const ModalBody = styled.div`
	overflow-y: auto;
	padding: 30px 10px;
	position: relative;
`;

const ModalHeader = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 20px 5px 5px 5px;
`;

const ModalTitle = styled.h4`
	width: 90%;
	text-align: right;
	border-bottom: 1px solid;
	font-weight: 300;
	text-transform: uppercase;
	color: #f24444;
`;

const Card = styled.div`
	width: 100%;
	img {
		width: 100%;
		height: 200px;
		border-radius: 10px;
	}
	h4 {
		margin-bottom: 10px;
		margin-top: 10px;
	}

	small {
		font-size: 10px;
		text-transform: uppercase;
		color: #304269;
		border-bottom: 2px solid #304269;
	}
`;

const Descripcion = styled.div`
	text-align: justify;
	margin-bottom: 5px;
`;

const Grid = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	font-size: 10px;
	padding: 0.5rem;
	border-radius: 10px;
	background-color: #304269;
	color: #f2d1c9;
`;

export default ModalDetail;
