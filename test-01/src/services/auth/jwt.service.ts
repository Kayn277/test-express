import type { JwtPair, JwtPairCreateData } from "./dto/jwt.dto.js";
import type { JwtAuthPayload } from "./dto/jwt.payload.js";
import { env } from "../../utils/env-validation.js";
import jwt from "jsonwebtoken";

export async function verify(token: string): Promise<JwtAuthPayload> {
  return jwt.verify(token, env.JWT_PRIVATE_KEY) as JwtAuthPayload;
}

export async function createJwtPair(
  payload: JwtPairCreateData
): Promise<JwtPair> {
  const accessToken: string = jwt.sign(payload, env.JWT_PRIVATE_KEY);
  const refreshToken: string = jwt.sign(payload, env.JWT_PRIVATE_KEY);
  return {
    accessToken,
    refreshToken,
  };
}

export async function updateJwtPair(refreshToken: string): Promise<JwtPair> {
  const payload = await verify(refreshToken);
  return createJwtPair(payload);
}
