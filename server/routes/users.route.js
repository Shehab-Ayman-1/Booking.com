import express from "express";
import { GET_USER, GET_USERS } from "../controllers/users.controller.js";
import { UPDATE_USER, DELETE_USER } from "../controllers/users.controller.js";
import { verifyAdmin, verifyUser } from "../middlewares/verify.middleware.js";

export const router = express.Router();

// GET ALL
router.get("/get-users", verifyAdmin, GET_USERS);

// GET
router.get("/get-user/:id", verifyUser, GET_USER);

// UPDATE
router.put("/update-user/:id", verifyUser, UPDATE_USER);

// DELETE
router.delete("/delete-user/:id", verifyUser, DELETE_USER);
