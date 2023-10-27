import { Hotels, Rooms } from "../models/index.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const GET_ROOMS = async (req, res) => {
	try {
		const { selected, ...query } = req.query;
		if (selected === "true") {
			let selectedQuery = {};
			Object.keys(query).forEach((key) => (selectedQuery[key] = true));
			const rooms = await Rooms.find().select(selectedQuery);
			res.status(200).json(rooms);
		} else {
			const rooms = await Rooms.find();
			res.status(200).json(rooms);
		}
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const GET_ROOM = async (req, res) => {
	try {
		const { roomID } = req.params;
		if (!mongoose.Types.ObjectId.isValid(roomID)) return res.status(404).json("This ID Is Not Currect.");

		const room = await Rooms.findById(roomID);
		if (!room) return res.status(404).json("This Room Is Not Defined.");

		res.status(200).json(room);
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const CREATE_ROOM = async (req, res) => {
	try {
		let { hotelID } = req.params;
		let body = req.body;

		let newRoom = new Rooms(body);
		newRoom.save();

		await Hotels.findByIdAndUpdate(hotelID, { $push: { rooms: newRoom._id } });

		res.status(200).json("The Room Was Successfully Created.");
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const UPDATE_ROOM = async (req, res) => {
	try {
		const { roomID } = req.params;
		if (!mongoose.Types.ObjectId.isValid(roomID)) return res.status(404).json("This roomID Is Not Currect.");

		await Rooms.findByIdAndUpdate(roomID, req.body, { new: true });
		res.status(200).json("The Room Was Successfully Updated.");
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const UPDATE_UN_AVAILABLE_ROOMS = async (req, res) => {
	try {
		const { roomNumbersID } = req.params;
		const { unAvailableDates } = req.body;
		console.log(roomNumbersID, unAvailableDates);

		let updated = await Rooms.updateOne({ "roomNumbers._id": roomNumbersID }, { $push: { "roomNumbers.$.unAvailableDates": unAvailableDates } });
		res.status(200).json({ success: "The Room Numbers Was Successfully Updated.", updated });
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const DELETE_ROOM = async (req, res) => {
	try {
		const { hotelID, roomID } = req.params;
		if (!mongoose.Types.ObjectId.isValid(roomID)) return res.status(404).json("This roomID Is Not Currect.");

		let room = await Rooms.findByIdAndDelete(roomID);
		if (!room) return res.status(404).json("The Room ID Is Not Currect.");

		await Hotels.findByIdAndUpdate(hotelID, { $pull: { rooms: new ObjectId(roomID) } });
		res.status(200).json("The Room Was Successfully Deleted.");
	} catch (error) {
		res.status(404).json(error.message);
	}
};
