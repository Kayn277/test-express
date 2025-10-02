import type { Request, Response } from "express";
import type { RequestWithUser } from "../../utils/request-with-user.js";
import { createFile, getFile, putFile } from "./client.js";
import { prisma } from "../database/client.js";
import { paginationSchema } from "./dto/file.dto.js";

export async function uploadFile(req: RequestWithUser, res: Response) {
    if (req.file && req.user) {
        res.json(await createFile(req.user.id, req.file));
    }

    res.sendStatus(400);
}

export async function listFiles(req: RequestWithUser, res: Response) {
    if (req.user) {
        let { list_size, page } = paginationSchema.parse(req.query);
        list_size = list_size ? list_size : 10;
        page = page ? page : 1;
        const filesCount = await prisma.file.count({
            where: {
                userId: req.user.id,
            }
        })
        const files = await prisma.file.findMany({
            where: {
                userId: req.user.id,
            },
            skip: (page - 1) * list_size,
            take: page,
        })

        res.json({
            files,
            total: filesCount,
            page: page,
            pages: Math.ceil(filesCount / list_size)
        })
    }

    res.sendStatus(400);
}

export async function download(req: RequestWithUser, res: Response) {
    if (req.params.id && req.user) {
        const file = await prisma.file.findUnique({
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
        });
        res.send(await getFile(req.user.id, file!.id));
    }

    res.sendStatus(400);
}

export async function updateFile(req: RequestWithUser, res: Response) {
    if (req.params.id && req.user && req.file) {

        if (req.file) {
            const updated = await putFile(req.user.id, req.params.id, req.file);
            res.json(updated);
        }
    }

    res.sendStatus(400);
}

export async function deleteFile(req: RequestWithUser, res: Response) {
    if (req.params.id && req.user) {
        await prisma.file.delete({
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
        });
        res.sendStatus(200);
    }

    res.sendStatus(400);
}

export async function showFileInfo(req: RequestWithUser, res: Response) {
    if (req.params.id && req.user) {
        const file = await prisma.file.findUnique({
            where: {
                id: req.params.id,
                userId: req.user.id,
            },
        });
        res.json(file);
    }

    res.sendStatus(400);
}