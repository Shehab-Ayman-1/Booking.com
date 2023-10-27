import { Fragment } from "react";
import { Link } from "react-router-dom";

export const Register = () => {
	return (
		<Fragment>
			<h1 className="title">Register</h1>
			<div className="flex-between gap">
				<div className="">
					<label htmlFor="fName">First Name: </label>
					<input type="text" id="fName" placeholder="First Name" />
				</div>
				<div className="">
					<label htmlFor="lName">Last Name: </label>
					<input type="text" id="lName" placeholder="Last Name" />
				</div>
			</div>
			<div className="">
				<label htmlFor="email">Email: </label>
				<input type="email" id="email" placeholder="Enter Your Email" />
			</div>
			<div className="">
				<label htmlFor="password">Password: </label>
				<input type="password" id="password" placeholder="Enter Your Password" />
			</div>
			<button className="mybtn" data-varient="outline">
				Submit
			</button>
			<p className="flex-center gap">
				Already Have An Account?
				<Link className="have-account" to="/login">
					Login
				</Link>
			</p>
		</Fragment>
	);
};
