import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { toast } from "react-toastify";
import FileBase from "react-file-base64";
import { MdOutlineClose } from "react-icons/md";
import { device } from "../../helpers/breakPoints";
import { Group, BtnPrimary } from "../../styles/form.elements";
import { agregarBocadito, reset } from "../../features/bocaditos/bocaditoSlice";
import { obtenerPerfil } from "../../features/usuarios/usuarioSlice";

const ModalAdd = ({ openModal, setOpenModal }) => {
	const [formData, setFormData] = useState({
		plato: "",
		descripcion: "",
		categorias: [],
		ingredientes: [],
		preparacion: "",
		foto: "",
	});

	const { isError, isSaved, isBlocked, mensaje } = useSelector(
		(state) => state.feed
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (isError) {
			toast.error(mensaje);
		}

		if (isSaved) {
			toast.success("Bocadito guardado con exito");
			dispatch(obtenerPerfil());
			setFormData({
				plato: "",
				descripcion: "",
				categorias: [],
				ingredientes: [],
				preparacion: "",
				foto: "",
			});
			setOpenModal(false);
		}

		return () => {
			dispatch(reset());
		};
	}, [isError, isSaved, mensaje, dispatch]);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			[formData.plato, formData.descripcion, formData.preparacion].includes("")
		) {
			toast.error("Todos los campos son obligatorios");
			return;
		}

		dispatch(agregarBocadito(formData));
	};

	return (
		<>
			{openModal && (
				<ModalBlock>
					<ModalOverlay />
					<ModalContainer>
						<ModalHeader>
							<ModalTitle>Nuevo Bocadito</ModalTitle>
							<ModalClose onClick={() => setOpenModal(false)}>
								<MdOutlineClose style={{ fontSize: "20px" }} />
							</ModalClose>
						</ModalHeader>
						<ModalBody>
							<form onSubmit={handleSubmit}>
								<Group>
									<label htmlFor="foto">Imagén: </label>
									<FileBase
										type="file"
										multiple={false}
										value={formData.foto}
										onDone={({ base64 }) =>
											setFormData({ ...formData, foto: base64 })
										}
									/>
								</Group>
								<Group>
									<label htmlFor="plato">Nombre del bocadito: </label>
									<input
										type="text"
										id="plato"
										name="plato"
										placeholder="¿Como se llama su bocadito?"
										value={formData.plato}
										onChange={handleChange}
									/>
								</Group>
								<Group>
									<label htmlFor="descripcion">Descripción</label>
									<textarea
										name="descripcion"
										id="descripcion"
										cols="30"
										rows="4"
										placeholder="Descripción del bocadito a subir..."
										style={{ padding: "0.5rem" }}
										maxLength={500}
										value={formData.descripcion}
										onChange={handleChange}
									></textarea>
								</Group>
								<Group>
									<label htmlFor="categorias">Categorías: </label>
									<input
										type="text"
										id="categorias"
										name="categorias"
										placeholder="Separé cada una con coma Eje: desayuno, cena"
										maxLength={50}
										value={formData.categorias}
										onChange={(e) =>
											setFormData({
												...formData,
												categorias: e.target.value.split(","),
											})
										}
									/>
								</Group>
								<Group>
									<label htmlFor="ingredientes">Ingredientes: </label>
									<input
										type="text"
										id="ingredientes"
										name="ingredientes"
										placeholder="Separé cada una con coma Eje: mantequilla, queso"
										maxLength={50}
										value={formData.ingredientes}
										onChange={(e) =>
											setFormData({
												...formData,
												ingredientes: e.target.value.split(","),
											})
										}
									/>
								</Group>
								<Group>
									<label htmlFor="preparacion">Preparación</label>
									<textarea
										name="preparacion"
										id="preparacion"
										cols="30"
										rows="4"
										placeholder="Preparación del bocadito a subir..."
										style={{ padding: "0.5rem" }}
										maxLength={500}
										value={formData.preparacion}
										onChange={handleChange}
									></textarea>
								</Group>
								<BtnPrimary type="submit" disabled={isBlocked}>
									Guardar
								</BtnPrimary>
							</form>
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
	background: rgba(0, 0, 0, 0.65);
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
	height: 450px;
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
		height: 500px;
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
	padding: 20px 5px 10px 5px;
`;

const ModalTitle = styled.h4`
	width: 90%;
	text-align: right;
	margin-bottom: 10px;
	border-bottom: 1px solid;
	font-weight: 300;
	text-transform: uppercase;
	color: #f24444;
`;

export default ModalAdd;
