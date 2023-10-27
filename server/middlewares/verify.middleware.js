import { Users } from "../models/index.js";
import jwt from "jsonwebtoken";

/**
 * This Function Check If The User Is login OR Not
 * - If User login => The Token Will Be Defined, And Go To The Next [Controllers]
 * - else => Send An Error Message Before Go To The Controllers Functions
 */
export const verifyToken = (req, res, next) => {
	try {
		let { access_token } = req.cookies;
		if (!access_token) return res.status(402).json("You Are Not Authonticated.");

		jwt.verify(access_token, process.env.ACCESS_TOKEN, (error, info) => {
			if (error) return res.status(400).json({ message: `verifyToken: Error [${error.message}]`, error });
			req.auth = info;
		});

		next();
	} catch (error) {
		res.status(404).json(error.message);
		console.log(`verifyToken: ${error.message}`);
	}
};

export const refreshToken = (req, res) => {
	try {
		const { refresh_token } = req.cookies;
		if (!refresh_token) return res.status(401).json("You Are Not Authonticated.");

		jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (error, info) => {
			if (error) return res.status(400).json(`refreshToken: Error [${error.message}]`);

			const newToken = jwt.sign({ id: info.id, isAdmin: info.isAdmin }, process.env.ACCESS_TOKEN, { expiresIn: "1h" });

			let expTime = 1000 * 60 * 60;
			res.cookie("access_token", newToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: expTime });

			return res.status(200).json(newToken);
		});
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const rememberLogin = (req, res, next) => {
	try {
		if (req.body?.email) return next();

		const { refresh_token } = req.cookies;
		if (!refresh_token) return res.status(400).json("Non-Authoritative Information.");

		jwt.verify(refresh_token, process.env.REFRESH_TOKEN, async (error, info) => {
			if (error) return res.status(400).json(`rememberLogin: [${error.message}]`);

			const user = await Users.findById(info.id);

			// jwt
			const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN, { expiresIn: "1h" });

			// Save Cookies
			let expTime = 1000 * 60 * 60;
			res.cookie("access_token", accessToken, { httpOnly: true, sameSite: "none", secure: true, maxAge: expTime });

			const { _id, password, isAdmin, ...rest } = user._doc;
			res.status(200).json({ ...rest, accessToken, expTime });
		});
	} catch (error) {
		res.status(404).json(error.message);
	}
};

/**
 * Check User Logged In Is Varify OR Not
 * - If The User ID Is The Same ID That Want To Update, So Controller Can Work
 * - Else Send An Error Message
 */
export const verifyUser = (req, res, next) => {
	try {
		let userLogin = () => {
			if (req.auth.id !== req.params.id && !req.auth.isAdmin) return res.status(401).json("You Are Not Authenticated.");
			next();
		};
		verifyToken(req, res, userLogin);
	} catch (error) {
		res.status(404).json(error.message);
		console.log(`verifyUser: ${error.message}`);
	}
};

// Check If The User Is Admin OR Not
export const verifyAdmin = (req, res, next) => {
	try {
		let adminLogin = () => {
			if (!req.auth.isAdmin) return res.status(401).json("Not Allowed Role, Just Admins Can To Access This Page.");
			next();
		};
		verifyToken(req, res, adminLogin);
	} catch (error) {
		res.status(404).json(error.message);
		console.log(`verifyAdmin: ${error.message}`);
	}
};
