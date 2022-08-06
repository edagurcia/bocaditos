import styled from "styled-components";

const Avatar = ({ children }) => {
	return <Border>{children}</Border>;
};

const Border = styled.div`
	width: 4rem;
	height: 4rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 50%;
	background-color: #f24444;
	color: #f2d1c9;
	font-size: 30px;
	font-weight: bold;
	margin-bottom: 15px;
`;

export default Avatar;
