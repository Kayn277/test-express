import { configDotenv } from "dotenv";
import z from "zod";

configDotenv();

const envSchema = z.object({
  PORT: z.number().default(3000),
  STORAGE_ENDPOINT: z.string(),
  STORAGE_PORT: z.number().default(9000),
  STORAGE_ACCESS_KEY: z.string(),
  STORAGE_SECRET_KEY: z.string(),
  STORAGE_BUCKET_NAME: z.string(),
});

export const env = envSchema.parse({
  PORT: +process.env.PORT!,
  STORAGE_ENDPOINT: process.env.STORAGE_ENDPOINT,
  STORAGE_PORT: +process.env.STORAGE_PORT!,
  STORAGE_ACCESS_KEY: process.env.STORAGE_ACCESS_KEY,
  STORAGE_SECRET_KEY: process.env.STORAGE_SECRET_KEY,
  STORAGE_BUCKET_NAME: process.env.STORAGE_BUCKET_NAME,
});
