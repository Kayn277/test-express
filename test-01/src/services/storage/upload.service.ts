import type { Request, Response } from "express";
import type { RequestWithUser } from "../../utils/request-with-user.js";
import { createFile, getFile, putFile } from "./client.js";
import { prisma } from "../database/client.js";
import { paginationSchema } from "./dto/file.dto.js";

export async function uploadFile(req: RequestWithUser, res: Response) {
    if (req.file && req.user) {
        const file = await createFile(req.user.id, req.file);
        size: file.size.toString(),
            res.send(JSON.stringify(file, (_, v) => typeof v === 'bigint' ? v.toString() : v));
    }
    res.sendStatus(400);
}

export async function listFiles(req: RequestWithUser, res: Response) {
    if (req.user) {
        let { list_size, page } = req.query;

        let take = list_size ? parseInt(list_size as string, 10) : 10;
        let skip = page ? parseInt(page as string, 10) : 1;

        const filesCount = await prisma.file.count({
            where: {
                userId: req.user.id,
            }
        })
        const files = await prisma.file.findMany({
            where: {
                userId: req.user.id,
            },
            skip: (skip - 1) * take,
            take: take,
        })

        res.send(JSON.stringify({
            files,
            total: filesCount,
            page: page,
            pages: Math.ceil(filesCount / take)
        }, (_, v) => typeof v === 'bigint' ? v.toString() : v))
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

        if (!file) {
            res.sendStatus(404);
            return;
        }
        res
            .setHeader('Content-Type', file.mime)
            .setHeader('Content-Disposition', `attachment; filename="${file.name + '.' + file.extension}"`);
        const fileStream = await getFile(req.user.id, file!.id);

        fileStream.pipe(res);
    }
    else {
        res.sendStatus(400);
    }
}

export async function updateFile(req: RequestWithUser, res: Response) {
    if (req.params.id && req.user && req.file) {

        if (req.file) {
            const updated = await putFile(req.user.id, req.params.id, req.file);
            res.send(JSON.stringify(updated, (_, v) => typeof v === 'bigint' ? v.toString() : v));
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
        res.send(JSON.stringify(file, (_, v) => typeof v === 'bigint' ? v.toString() : v));
    }

    res.sendStatus(400);
}