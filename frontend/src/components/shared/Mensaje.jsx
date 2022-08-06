import styled from "styled-components";
import { device } from "../../helpers/breakPoints";

const Mensaje = ({ mensaje, tipo }) => {
	return (
		<MensajeText className={tipo === "error" ? "errorMsg" : "infoMsg"}>
			{mensaje}
		</MensajeText>
	);
};

const MensajeText = styled.h3`
	width: 100%;
	height: 2rem;
	text-align: center;
	text-transform: uppercase;
	font-size: 1rem;

	.errorMsg {
		background-color: #ffe5e5;
		color: #cc0000;
	}

	.infoMsg {
		background-color: #acf0f2;
		color: #225378;
	}

	@media ${device.tablet} {
		font-size: 1.4rem;
	}
`;

export default Mensaje;
