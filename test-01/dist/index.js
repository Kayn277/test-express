import { configDotenv } from "dotenv";
import express from "express";
import { env } from "./utils/env-validation.js";
const app = express();
app.listen(env.PORT, () => {
    console.log("Listen on port", env.PORT);
});
//# sourceMappingURL=index.js.map