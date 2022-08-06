import styled from "styled-components";

const Group = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;

	input {
		padding: 15px;
		margin: 10px 0px;
		border-radius: 5px;
		border: 1px solid gray;
	}

	label {
		font-size: 12px;
		color: gray;
	}

	span {
		font-size: 12px;
		padding: 3px;
		color: red;
		display: none;
	}
`;

const BtnPrimary = styled.button`
	width: 100%;
	height: 3rem;
	margin-top: 5px;
	border: none;
	border-radius: 8px;
	background-color: #f2d1c9;
	text-transform: uppercase;
	letter-spacing: 2px;
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
`;

export { Group, BtnPrimary };
