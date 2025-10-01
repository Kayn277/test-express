import type { NextFunction, Request, Response } from "express";
import type { RequestWithUser } from "../../../utils/request-with-user.js";

export function withUserAuth(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    
  } else {
    res.sendStatus(401);
  }
}
