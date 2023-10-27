import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Users } from "../models/index.js";

export const LOGIN = async (req, res) => {
	try {
		const { trust, ...body } = req.body;

		// checking validity
		const allFilled = Object.values(body).every((item) => item);
		if (!allFilled || !body?.email) return res.status(203).json("Non-Authoritative Information.");

		// find user
		const user = await Users.findOne({ email: body.email });
		if (!user) return res.status(400).json("Your Email Is Not Currect.");

		// bcrypt
		const compare = await bcrypt.compare(body.password, user.password);
		if (!compare) return res.status(400).json("Your Password Is Not Currect.");

		// jwt
		const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
		const refreshToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.REFRESH_TOKEN, { expiresIn: "2h" });

		// Save Cookies
		let expTime = 1000 * 60 * 60;
		res.cookie("access_token", accessToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: expTime });
		res.cookie("refresh_token", refreshToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: expTime * 2 });

		const { _id, password, isAdmin, ...rest } = user._doc;
		res.status(200).json({ ...rest, accessToken, expTime });
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const REGISTER = async (req, res) => {
	try {
		const { avatar, email, password, trust, ...body } = req.body;

		// Check Filled Inputs
		const allFilled = Object.values(body).every((item) => item);
		if (!allFilled) return res.status(400).json("All Fields Are Required.");

		// Check Auth Validate
		const auth = await Users.findOne({ email });
		if (auth) return res.status(400).json("This Auth Is Already Registered.");

		// Hash
		const hashing = bcrypt.hashSync(password, 10);
		const newUser = new Users({ avatar, email, password: hashing, ...body });

		await newUser.save();
		res.status(200).json("The User Was Successfully Registered");
	} catch (error) {
		res.status(404).json(error.message);
	}
};
