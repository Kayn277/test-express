import { configDotenv } from "dotenv";
import z from "zod";
configDotenv();
const envSchema = z.object({
    PORT: z.number().default(3000),
});
export const env = envSchema.parse({
    PORT: +process.env.PORT,
});
//# sourceMappingURL=env-validation.js.map