import { Router } from "express";
import { withUserAuth } from "../services/auth/middleware/withUserAuth.js";
import type { RequestWithUser } from "../utils/request-with-user.js";

export const user = Router();

user.get("/info", withUserAuth, (req: RequestWithUser, res) => {
    return res.json({
        id: req.user?.id,
    });
});
