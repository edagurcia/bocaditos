import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { device } from "../helpers/breakPoints";
import Topbar from "../components/topbar/Topbar";
import UserCard from "../components/usercard/UserCard";
import Spinner from "../components/shared/Spinner";

const PrivateLayout = () => {
	const { usuario, isLoading } = useSelector((state) => state.auth);

	if (isLoading) return <Spinner />;

	return (
		<>
			{usuario?._id ? (
				<Container>
					<Topbar />
					<Stack>
						<UserCard />
						<Outlet />
					</Stack>
					<ToastContainer />
				</Container>
			) : (
				<Navigate to="/" />
			)}
		</>
	);
};

const Container = styled.main`
	width: 100vw;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Stack = styled.div`
	display: flex;

	@media ${device.laptop} {
		gap: 1rem;
		padding: 1rem;
	}
`;

export default PrivateLayout;
