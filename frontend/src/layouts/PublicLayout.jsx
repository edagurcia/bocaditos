import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

const PublicLayout = () => {
	return (
		<Container>
			<Outlet />
			<ToastContainer />
		</Container>
	);
};

const Container = styled.main`
	width: 100vw;
	height: 100vh;
	padding: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default PublicLayout;
