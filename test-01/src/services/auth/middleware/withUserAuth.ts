import type { NextFunction, Request, Response } from "express";
import type { RequestWithUser } from "../../../utils/request-with-user.js";
import { getUser } from "../../user/user.service.js";
import { verify } from "../jwt.service.js";

export async function withUserAuth(
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    try {
      if (token) {
        const jwtVerify = await verify(token);
        const user = await getUser(jwtVerify.userId);
        if (!user) {
          throw new Error("Unauthorized");
        }
        req.user = {
          accessToken: token,
          ...user
        };
        next();
      }
      else {
        throw new Error("Unauthorized");
      }
    }
    catch (err) {
      res.sendStatus(401);
      next(err);
    }


  }
}
