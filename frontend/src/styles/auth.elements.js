import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { device } from "../helpers/breakPoints";

const LoginContainer = styled.div`
	width: 90%;
	height: 400px;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	background: rgba(255, 255, 255, 0.35);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.67);
	backdrop-filter: blur(4px);
	-webkit-backdrop-filter: blur(4px);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.18);

	@media ${device.tablet} {
		width: 350px;
	}
`;

const RegisterContainer = styled(LoginContainer)`
	height: 400px;
`;

const Link = styled(LinkR)`
	font-size: 15px;
	text-align: right;
	text-decoration: none;
	margin-top: 20px;
	color: #595959;

	&:hover {
		color: #262626;
	}
`;

const Title = styled.h1`
	font-family: "Cormorant SC", serif;
	font-weight: 900;
	font-size: 2.5rem;
	text-align: right;
	margin-bottom: 15px;
	color: #f24444;
	text-shadow: 3px -2px 5px rgba(0, 0, 0, 0.68);
`;

const StepperButtons = styled.div`
	width: 100%;
	margin-top: 10px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	svg {
		font-size: 25px;
	}

	button {
		border: none;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f2d1c9;
		color: #f24444;

		&:hover {
			cursor: pointer;
			background-color: #f24444;
			color: #f2d1c9;
		}

		&:disabled {
			background-color: #a6a6a6;
			color: #f2f2f2;
			cursor: default;
		}
	}
`;

const StepperContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
	margin-top: 10px;
	margin-bottom: 10px;

	div {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f2d1c9;
		color: #f24444;
	}

	span {
		width: 35px;
		border: 2px solid #f2d1c9;
	}

	p {
		font-size: 17px;
		font-weight: 500;
	}

	.active {
		background-color: #f24444;
		color: #f2d1c9;
	}
`;

export {
	LoginContainer,
	RegisterContainer,
	Link,
	Title,
	StepperButtons,
	StepperContainer,
};
