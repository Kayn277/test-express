import type { NextFunction, Request, Response } from "express";
import { ZodError, ZodObject } from "zod";


export const bodyZodValidate = (zod: ZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            zod.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    name: error.name,
                    message: error.message,
                    cause: error.cause,
                });
            }
            next(error);
        }
    }
