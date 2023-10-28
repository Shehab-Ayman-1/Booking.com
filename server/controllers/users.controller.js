import { Users } from "../models/index.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export const GET_USERS = async (req, res) => {
	try {
		const { from } = req.query;
		const count = await Users.countDocuments();
		const users = await Users.find().skip(from).limit(5);

		if (from) res.status(200).json({ count, users });
		else res.status(200).json({ count, users });
	} catch (error) {
		res.status(404).json(`GET_USERS ${error.message}`);
	}
};

export const GET_USER = async (req, res) => {
	try {
		let { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("This ID Is Not Valid.");

		let user = await Users.findById(id);
		res.status(200).json(user);
	} catch (error) {
		res.status(404).json(`GET_USER ${error.message}`);
	}
};

export const UPDATE_USER = async (req, res) => {
	try {
		const { id } = req.params;
		const { password, ...body } = req.body;
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("This ID Is Not Currect");

		if (password) {
			const hashPassword = await bcrypt.hash(password, 10);
			await Users.findByIdAndUpdate(id, { ...body, password: hashPassword }, { new: true });
		} else {
			await Users.findByIdAndUpdate(id, body, { new: true });
		}

		res.status(200).json("The User Was Successfully Updated.");
	} catch (error) {
		res.status(404).json(`UPDATE_USER ${error.message}`);
	}
};

export const DELETE_USER = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("This ID Is Not Currect");

		await Users.findByIdAndDelete(id, req.body, { new: true });
		res.status(200).json("The User Was Deleted Successfully.");
	} catch (error) {
		res.status(404).json(`DELETE_USER ${error.message}`);
	}
};
