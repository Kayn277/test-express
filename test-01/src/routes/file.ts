import { Router } from "express";
import { uploadFile } from "../services/storage/upload.service.js";
import multer from "multer";

const file = Router();
const upload = multer();

file.post("/upload", upload.single("file"), uploadFile);
file.get("/list");
file.delete("/delete");
file.get("/:id");
file.get("/download/:id");
file.get("/update/:id");
