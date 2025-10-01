import { Router } from "express";

const file = Router();

file.post("/upload");
file.get("/list");
file.delete("/delete");
file.get("/:id");
file.get("/download/:id");
file.get("/update/:id");
