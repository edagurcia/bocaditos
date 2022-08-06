import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import PrivateLayout from "./layouts/PrivateLayout";
import Home from "./pages/home/Home";
import Perfil from "./pages/perfil/Perfil";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PublicLayout />}>
					<Route index element={<Login />} />
					<Route path="/register" element={<Register />} />
				</Route>
				<Route path="/app" element={<PrivateLayout />}>
					<Route index element={<Home />} />
					<Route path="/app/perfil" element={<Perfil />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
