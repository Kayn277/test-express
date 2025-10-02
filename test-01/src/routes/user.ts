import { Router } from "express";
import { withUserAuth } from "../services/auth/middleware/withUserAuth.js";
import type { RequestWithUser } from "../utils/request-with-user.js";

const user = Router();

user.post("/info", withUserAuth, (req: RequestWithUser, res) => {
    return res.json(req.user!.id);
});
