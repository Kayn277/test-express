import express from "express";
import { env } from "./utils/env-validation.js";
import { initializeBucket } from "./services/storage/client.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { api } from "./routes/index.js";


async function main() {
  await initializeBucket();

  const app = express();

  app.use(cookieParser());
  app.use(express.json());
  app.use(cors())

  app.use("/api", api);

  app.listen(env.PORT, async () => {
    console.log("Listen on port", env.PORT);
  });
}

main();