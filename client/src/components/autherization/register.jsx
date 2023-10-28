import { useAxios } from "@/hooks";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles/sign.scss";

const formState = { fName: "", lName: "", email: "", password: "", cPassword: "" };
export const Register = () => {
	const [formData, setFormData] = useState(formState);
	const { data, loading, error, Refetch } = useAxios("get", "/");
	const navigate = useNavigate();

	const handleChange = ({ target: { name, value } }) => setFormData((f) => ({ ...f, [name]: value }));

	const handleSubmit = async (event) => {
		event.preventDefault();

		const { cPassword, ...form } = formData;
		if (form.password !== cPassword) return alert("Passwords Are Not Matching.");

		const { data, loading, error } = await Refetch("post", "/auths/register", form);
		localStorage.setItem("user", JSON.stringify(form));
		if (!loading && !error && typeof data === "string") navigate("/");
	};

	return (
		<form className="form" onSubmit={handleSubmit}>
			<h1 className="title">Register</h1>
			{!loading && error && <h4 className="error">{error}</h4>}
			{!loading && !error && typeof data === "string" && <h4 className="success">{data}</h4>}
			<div className="flex-between gap">
				<div className="">
					<label htmlFor="fName">First Name: </label>
					<input type="text" name="fName" id="fName" placeholder="First Name" onChange={handleChange} />
				</div>
				<div className="">
					<label htmlFor="lName">Last Name: </label>
					<input type="text" name="lName" id="lName" placeholder="Last Name" onChange={handleChange} />
				</div>
			</div>
			<div className="">
				<label htmlFor="email">Email: </label>
				<input type="email" name="email" id="email" placeholder="Email" onChange={handleChange} />
			</div>
			<div className="">
				<label htmlFor="password">Password: </label>
				<input type="password" name="password" id="password" placeholder="Password" onChange={handleChange} />
			</div>
			<div className="">
				<label htmlFor="cPassword">Password: </label>
				<input type="password" name="cPassword" id="cPassword" placeholder="Confirm Your Password" onChange={handleChange} />
			</div>
			<button type="submit" className="mybtn" data-varient="outline">
				Submit
			</button>
			<p className="flex-center gap">
				Already Have An Account?
				<Link className="have-account" to="/login">
					Login
				</Link>
			</p>
		</form>
	);
};
