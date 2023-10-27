import express from "express";
import { GET_ROOMS, GET_ROOM, CREATE_ROOM, UPDATE_ROOM, DELETE_ROOM, UPDATE_UN_AVAILABLE_ROOMS } from "../controllers/rooms.controller.js";

export const router = express.Router();

// GET ALL
router.get("/get-rooms", GET_ROOMS);

// GET
router.get("/get-room/:roomID", GET_ROOM);

// CREATE
router.post("/create-room/:hotelID", CREATE_ROOM);

// UPDATE
router.put("/update-room/:roomID", UPDATE_ROOM);
router.put("/update-un-available-rooms/:roomNumbersID", UPDATE_UN_AVAILABLE_ROOMS);

// DELETE
router.delete("/delete-room/:hotelID/:roomID", DELETE_ROOM);
