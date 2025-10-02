import type { JwtPair, JwtPairCreateData } from "./dto/jwt.dto.js";
import type { JwtAuthPayload } from "./dto/jwt.payload.js";
import { env } from "../../utils/env-validation.js";
import jwt from "jsonwebtoken";
import { prisma } from "../database/client.js";
import type { Session } from "@prisma/client";

export async function verify(token: string): Promise<Session> {
    const payload = jwt.verify(token, env.JWT_PRIVATE_KEY) as JwtAuthPayload;
    const findedSession = await prisma.session.findFirst({
        where: {
            id: payload.sessionId,
        }
    });

    if (!findedSession) {
        throw new Error("Session not found");
    }

    return findedSession;
}

export async function removeSession(token: string): Promise<void> {
    const payload = jwt.verify(token, env.JWT_PRIVATE_KEY) as JwtAuthPayload;
    const findedSession = await prisma.session.findFirst({
        where: {
            id: payload.sessionId,
        }
    });

    if (!findedSession) {
        throw new Error("Session not found");
    }

    await prisma.session.delete({
        where: {
            id: payload.sessionId,
        }
    });
}

export async function createJwtPair(
    data: JwtPairCreateData
): Promise<JwtPair> {
    return prisma.$transaction(async (tx) => {
        const createdSession = await tx.session.create({
            data: {
                userId: data.userId,
                device: data.userAgent,
                ip: data.ip,
                refreshToken: "transaction"
            },
        });
        let payload: JwtAuthPayload = {
            sessionId: createdSession.id,
            userId: data.userId
        }
        const accessToken: string = jwt.sign(payload, env.JWT_PRIVATE_KEY);
        const refreshToken: string = jwt.sign(payload, env.JWT_PRIVATE_KEY);

        await tx.session.update({
            where: {
                id: createdSession.id,
            },
            data: {
                refreshToken,
            },
        });

        return {
            accessToken,
            refreshToken,
        };
    });
}

export async function updateJwtPair(refreshToken: string): Promise<JwtPair> {
    const session = await verify(refreshToken);
    return createJwtPair({
        ip: session.ip,
        userAgent: session.device,
        userId: session.userId
    });
}
