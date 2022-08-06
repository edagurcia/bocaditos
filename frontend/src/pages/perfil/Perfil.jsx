import { useState } from "react";
import styled from "styled-components";
import { PageContainer } from "../../styles/containers.elements";
import Navegador from "../../components/perfil/Navegador";
import FormPassword from "../../components/perfil/FormPassword";
import FormRedes from "../../components/perfil/FormRedes";

const Perfil = () => {
	const [opcion, setOpcion] = useState("redes");

	return (
		<PageContainer>
			<PerfilContainer>
				<Navegador opcion={opcion} setOpcion={setOpcion} />
				{opcion === "redes" && <FormRedes />}
				{opcion === "password" && <FormPassword />}
			</PerfilContainer>
		</PageContainer>
	);
};

const PerfilContainer = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export default Perfil;
