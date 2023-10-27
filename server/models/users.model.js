import { Schema, model } from "mongoose";

const schema = new Schema(
	{
		avatar: { type: String },
		fName: { type: String, required: true },
		lName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		isAdmin: { type: Boolean, default: false },
	},
	{ timestamps: true }
);

export const Users = model("users", schema);
