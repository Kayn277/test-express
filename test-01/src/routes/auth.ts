import { Router } from "express";

const auth = Router();

auth.post("/signin");
auth.post("/signin/new_token");
auth.post("/signup");
auth.get("/logout");
