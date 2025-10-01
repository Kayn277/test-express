import { Router } from "express";
import { withUserAuth } from "../services/auth/middleware/withUserAuth.js";

const auth = Router();

auth.post("/signin");
auth.post("/signin/new_token");
auth.post("/signup");
auth.get("/logout", withUserAuth);
