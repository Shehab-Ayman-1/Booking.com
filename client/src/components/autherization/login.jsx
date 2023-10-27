import { Fragment, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAxios } from "@/hooks";

export const Login = () => {
	const [credentials, setCredentials] = useState({ email: "", password: "" });
	const { loading: isLoading, error, Refetch } = useAxios("post", "/");
	const { state } = useLocation();
	const navigate = useNavigate();

	const handleChange = ({ target: { name, value } }) => {
		setCredentials((c) => (c = { ...c, [name]: value }));
	};

	const handleSubmit = async () => {
		if (!credentials.email) return alert("Email Is Required Field.");
		if (!credentials.password) return alert("Password Is Required Field.");

		const { data, loading, error } = await Refetch("post", "/auths/login", credentials);
		if (!loading && error) return;

		if (data?.email) {
			setTimeout(() => navigate(state?.fromPathname || "/"), 1000);
			localStorage.setItem("user", JSON.stringify(data));
		}
	};

	return (
		<Fragment>
			<h1 className="title">Login</h1>
			<span className="error">{error}</span>
			<div className="">
				<label htmlFor="email">Email: </label>
				<input type="email" id="email" name="email" placeholder="Enter Your Email" onChange={handleChange} />
			</div>
			<div className="">
				<label htmlFor="password">Password: </label>
				<input type="password" id="password" name="password" placeholder="Enter Your Password" onChange={handleChange} />
			</div>
			<button className="mybtn" data-varient="outline" disabled={isLoading} onClick={handleSubmit}>
				{isLoading ? "Loading..." : "Submit"}
			</button>
			<p className="flex-center gap">
				Don't Have An Account?
				<Link className="have-account" to="/register">
					Register
				</Link>
			</p>
		</Fragment>
	);
};
