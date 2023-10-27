import express from "express";
import { LOGIN, REGISTER } from "../controllers/auths.controller.js";
import { CHECK_AUTHENTICATION, CHECK_USER, CHECK_ADMIN } from "../controllers/checkers.controller.js";
import { verifyToken, verifyUser, verifyAdmin, rememberLogin, refreshToken } from "../middlewares/verify.middleware.js";

export const router = express.Router();

// CHECKERS
router.get("/check-authentication", verifyToken, CHECK_AUTHENTICATION);
router.get("/check-user/:id", verifyUser, CHECK_USER);
router.get("/check-admin", verifyAdmin, CHECK_ADMIN);

// SIGN_IN / SIGN_UP
router.post("/login", rememberLogin, LOGIN);
router.post("/register", REGISTER);

// Refresh Token
router.get("/refresh-token", refreshToken);
