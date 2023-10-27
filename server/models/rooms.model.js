import { Schema, model } from "mongoose";

const schema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		price: { type: Number, required: true },
		maxPeople: { type: Number, required: true },
		roomNumbers: { type: [{ number: Number, unAvailableDates: [Date] }] },
	},
	{ timestamps: true }
);

export const Rooms = model("rooms", schema);
