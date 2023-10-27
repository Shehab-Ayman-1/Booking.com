import { useLocation, useNavigate } from "react-router-dom";
import { Login, Register } from "@/components";
import "./styles/login.scss";

export const Sign = () => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<section className="login-section">
			<div className="box">
				<i className="fa fa-arrow-left back-icon" onClick={() => navigate("/")} />
				<i className="fas fa-street-view person-icon" />
				{pathname === "/login" && <Login />}
				{pathname === "/register" && <Register />}
			</div>
		</section>
	);
};
