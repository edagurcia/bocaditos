import styled from "styled-components";
import { device } from "../../helpers/breakPoints";

const Logo = () => {
	return <LogoMsg id="home">bocaditos</LogoMsg>;
};

const LogoMsg = styled.h1`
	width: 100%;
	font-family: "Cormorant SC", serif;
	font-weight: 900;
	font-size: 2rem;
	text-align: right;
	margin-bottom: 15px;
	color: #f24444;
	text-shadow: 3px -2px 5px rgba(0, 0, 0, 0.68);
	border-bottom: 1px solid #f24444;

	@media ${device.laptop} {
		font-size: 5rem;
	}
`;

export default Logo;
