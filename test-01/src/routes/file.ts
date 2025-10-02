import { Router } from "express";
import { deleteFile, download, listFiles, showFileInfo, updateFile, uploadFile } from "../services/storage/upload.service.js";
import multer from "multer";
import { withUserAuth } from "../services/auth/middleware/withUserAuth.js";

export const file = Router();
const upload = multer();

file.use(withUserAuth); //Make routes protected withUserAuth middleware

file.post("/upload", upload.single("file"), uploadFile);
file.get("/list", listFiles);
file.delete("/delete", deleteFile);
file.get("/:id", showFileInfo);
file.get("/download/:id", download);
file.get("/update/:id", upload.single("file"), updateFile);
