import express from "express";
import { GET_HOTELS, GET_HOTEL, GET_HOTEL_ROOMS, GET_LIMITED_HOTELS, GET_HOTELS_COUNT, GET_LIST_OF } from "../controllers/hotels.controller.js";
import { CREATE_HOTEL, UPDATE_HOTEL, DELETE_HOTEL, GET_DEFAULT_HOTELS } from "../controllers/hotels.controller.js";
import { verifyAdmin } from "../middlewares/verify.middleware.js";

export const router = express.Router();

// GET ALL
router.get("/get-hotels", GET_HOTELS);
router.get("/get-limited-hotels", GET_LIMITED_HOTELS);

// GET
router.get("/get-hotel/:id", GET_HOTEL);
router.get("/get-hotel-rooms/:hotelID", GET_HOTEL_ROOMS);
router.get("/get-hotels-count", GET_HOTELS_COUNT);
router.get("/get-list-of", GET_LIST_OF);

// CREATE
router.post("/create-hotel", verifyAdmin, CREATE_HOTEL);
router.post("/default-hotels", GET_DEFAULT_HOTELS);

// UPDATE
router.put("/update-hotel/:id", verifyAdmin, UPDATE_HOTEL);

// DELETE
router.delete("/delete-hotel/:id", verifyAdmin, DELETE_HOTEL);
