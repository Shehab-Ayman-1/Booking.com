import { Schema, model } from "mongoose";

const schema = new Schema({
	name: { type: String },
	title: { type: String },
	type: { type: String },
	address: { type: String },
	city: { type: String },
	description: { type: String },
	distance: { type: Number },
	price: { type: Number },
	rating: { type: Number, min: 0, max: 10, default: 7 },
	photos: { type: Array },
	rooms: { type: Array },
	featured: { type: Boolean, default: false },
});

export const Hotels = model("hotels", schema);
