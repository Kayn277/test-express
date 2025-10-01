import { Router } from "express";
import { uploadFile } from "../services/storage/upload.service.js";
import multer from "multer";
import { withUserAuth } from "../services/auth/middleware/withUserAuth.js";

const file = Router();
const upload = multer();

file.use(withUserAuth); //Make routes protected withUserAuth middleware

file.post("/upload", upload.single("file"), uploadFile);
file.get("/list");
file.delete("/delete");
file.get("/:id");
file.get("/download/:id");
file.get("/update/:id");
