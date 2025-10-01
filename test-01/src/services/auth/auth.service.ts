import type { NextFunction, Request, Response } from "express";

export function withUserAuth(req: Request, res: Response, next: NextFunction) {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
  } else {
    res.sendStatus(401);
  }
}

export function verify(token: string) {}
