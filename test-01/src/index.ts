import { configDotenv } from "dotenv";
import express from "express";
import { env } from "./utils/env-validation.js";
import { initializeBucket } from "./services/storage/client.js";

const app = express();

app.listen(env.PORT, async () => {
  console.log("Listen on port", env.PORT);

  //Check storage bucket exists
  await initializeBucket();
});
