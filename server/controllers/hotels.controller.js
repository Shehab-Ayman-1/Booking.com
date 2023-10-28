import mongoose from "mongoose";
import { Hotels, Rooms } from "../models/index.js";
import { defaultHotels, defaultPhotos } from "../data/index.js";

export const GET_DEFAULT_HOTELS = async (req, res) => {
	try {
		// GET Rooms Ids
		const roomsIds = await Rooms.find().select("_id");
		const rooms = roomsIds.reduce((prev, cur) => prev.concat(cur._id), []);

		// GET Default Hotels
		const result = defaultHotels.map((hotel) => {
			// GET Random Photos
			let photos = [];
			defaultPhotos.forEach(() => {
				while (photos.length !== defaultPhotos.length) {
					let randInt = Math.floor(Math.random() * defaultPhotos.length);
					let photo = defaultPhotos[randInt];
					!photos.includes(photo) && photos.push(photo);
				}
			});
			return { ...hotel, rooms, photos: photos.slice(0, 6) };
		});
		const createDefaultHotels = await Hotels.create(result);
		res.status(200).json(createDefaultHotels);
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const GET_LIMITED_HOTELS = async (req, res) => {
	try {
		const { from } = req.query;

		const documentsCount = await Hotels.countDocuments();
		const hotels = await Hotels.find().skip(from).limit(5);

		if (from) return res.status(200).json({ count: documentsCount, hotels });
		res.status(200).json({ count: documentsCount, hotels });
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const GET_HOTELS = async (req, res) => {
	try {
		const { limit, min, max, city, from, ...query } = req.query;
		const price = { $gt: +min || 0, $lt: +max || 9999 };

		if (city === "All Locations") {
			if (from) {
				const count = await Hotels.find({ ...query, price }).countDocuments();
				const hotels = await Hotels.find({ ...query, price })
					.skip(from)
					.limit(5);

				res.status(200).json({ hotels, count });
			} else {
				const count = await Hotels.find({ ...query, price }).countDocuments();
				const hotels = await Hotels.find({ ...query, price }).limit(limit || 10);

				res.status(200).json({ hotels, count });
			}
		} else {
			if (from) {
				const count = await Hotels.find({ ...query, city, price }).countDocuments();
				const hotels = await Hotels.find({ ...query, city, price })
					.skip(from)
					.limit(5);

				res.status(200).json({ hotels, count });
			} else {
				const count = await Hotels.find({ ...query, city, price }).countDocuments();
				const hotels = await Hotels.find({ ...query, city, price }).limit(limit || 10);

				res.status(200).json({ hotels, count });
			}
		}
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const GET_HOTEL = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "This ID Is Not Currect", id, Hotels });

		const hotel = await Hotels.findById(id);
		if (!hotel) return res.status(404).json("This Hotel Is Not Defined");

		res.status(200).json(hotel);
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const GET_HOTEL_ROOMS = async (req, res) => {
	try {
		const { hotelID } = req.params;
		if (!mongoose.Types.ObjectId.isValid(hotelID)) return res.status(404).json("This ID Is Not Valid.");

		const hotel = await Hotels.findById(hotelID);
		const rooms = await Rooms.find({ _id: hotel.rooms });

		res.status(200).json(rooms);
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const GET_LIST_OF = async (req, res) => {
	try {
		const { types, cities } = req.query;

		if (types) {
			const query = types.split(",");
			const listOfTypes = query.map(async (type) => ({ type, count: await Hotels.countDocuments({ type }) }));

			const result = await Promise.all(listOfTypes);
			return res.status(200).json(result);
		}

		if (cities) {
			const query = cities.split(",");
			let listOfCities;

			if (cities === "All Locations") {
				const cities = await Hotels.find().select("city");
				listOfCities = cities.map(({ city }) => city);
			} else {
				listOfCities = query.map(async (city) => ({ city, count: await Hotels.countDocuments({ city }) }));
			}

			const result = await Promise.all(listOfCities);
			return res.status(200).json(result);
		}

		res.status(404).json(`Only Types And Cities Are Available`);
	} catch (error) {
		res.status(404).json(`GET_LIST_OF: ${error.message}`);
		console.log(error?.message);
	}
};

export const GET_HOTELS_COUNT = async (req, res) => {
	try {
		const { city } = req.query;

		if (city === "All Locations") {
			const count = await Hotels.countDocuments();
			res.status(200).json(count);
		} else {
			const count = await Hotels.find({ city }).countDocuments();
			res.status(200).json(count);
		}
	} catch (error) {
		res.status(404).json(error);
	}
};

export const CREATE_HOTEL = async (req, res) => {
	try {
		let body = req.body;

		let allFilled = Object.values(body).every((item) => item);
		if (!allFilled) return res.status(404).json("All Hotel Fields Are Required.");

		const newHotel = await Hotels.create(req.body);
		res.status(202).json(newHotel);
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const UPDATE_HOTEL = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("This ID Is Not Currect");

		await Hotels.findByIdAndUpdate(id, req.body, { new: true });
		res.status(200).json("The Hotel Was Successfully Updated.");
	} catch (error) {
		res.status(404).json(error.message);
	}
};

export const DELETE_HOTEL = async (req, res) => {
	try {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json("This ID Is Not Currect");

		await Hotels.findByIdAndDelete(id);
		res.status(200).json("The Hotel Was Successfully Deleted.");
	} catch (error) {
		res.status(404).json(error.message);
	}
};
