import { Router } from "express";
import { auth } from "./auth.js";
import { user } from "./user.js";
import { file } from "./file.js";

export const api = Router();

api.use("/auth", auth);
api.use("/user", user)
api.use("/file", file);