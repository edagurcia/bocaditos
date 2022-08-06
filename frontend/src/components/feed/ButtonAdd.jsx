import styled from "styled-components";
import { FaPlus } from "react-icons/fa";
import { device } from "../../helpers/breakPoints";

const ButtonAdd = ({ setOpenModal }) => {
	return (
		<Button onClick={() => setOpenModal(true)}>
			<FaPlus />
		</Button>
	);
};

const Button = styled.div`
	width: 70px;
	height: 70px;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	border: 2px solid #f2f2f2;
	position: fixed;
	bottom: 40px;
	left: 40%;

	background-color: #595959;
	color: #ffffff;

	&:hover {
		cursor: pointer;
		background-color: #262626;
	}

	svg {
		font-size: 40px;
	}

	@media ${device.laptop} {
		left: 40px;
	}
`;

export default ButtonAdd;
