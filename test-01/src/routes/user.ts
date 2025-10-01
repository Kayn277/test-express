import { Router } from "express";
import { withUserAuth } from "../services/auth/middleware/withUserAuth.js";

const user = Router();

user.post("/info", withUserAuth, (req, res) => {});
