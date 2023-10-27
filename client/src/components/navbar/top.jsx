import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@/assets";
import { Menu } from "..";
import "./styles/top.scss";

export const TopSection = () => {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (!user) return;

		setUser((u) => (u = { fName: user.fName, lName: user.lName }));
	}, []);

	useEffect(() => {
		const getPosition = () => {
			const section = document.querySelector(".top-section");
			const menu = document.querySelector(".user-dropdown .menu");
			const sidePageSpace = window.innerWidth - section?.clientWidth || 0;
			if (menu) menu.style.right = `${sidePageSpace / 2 + 20}px`;
		};
		window.addEventListener("resize", getPosition);
		getPosition();
	});

	const handleLogout = () => {
		localStorage.removeItem("user");
		navigate("/login");
	};

	return (
		<div className="top-section">
			<Link to="/" className="logo">
				Booking.com
			</Link>
			<div className="right-side">
				<i className="far fa-question-circle fa-xl" />
				<Link to="https://booking-com-admin.netlify.app" className="mybtn" target="_blank" data-varient="outline">
					Dashboard
				</Link>

				<div className={`flex-between ${user ? "hidden" : ""}`}>
					<button className="mybtn" data-varient="fill" onClick={() => navigate("/register")}>
						Register
					</button>
					<button className="mybtn" data-varient="fill" onClick={() => navigate("/login")}>
						Login
					</button>
				</div>

				<Menu title={<img className="avatar" src={Avatar} alt="avatar" />} useArrow={false} hidden={!user} closeable>
					<div className="option name">
						<h3>
							{user?.fName} {user?.lName}
						</h3>
					</div>
					<div className="option">
						<i className="far fa-user text-black" />
						<h3>Profile</h3>
					</div>
					<div className="option">
						<i className="fa fa-gear text-black" />
						<h3>Setting</h3>
					</div>
					<div className="option" onClick={handleLogout}>
						<i className="fa fa-sign-out-alt text-black" />
						<h3>Logout</h3>
					</div>
				</Menu>
			</div>
		</div>
	);
};
