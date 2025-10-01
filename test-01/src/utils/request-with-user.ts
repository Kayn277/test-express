import type { Request } from "express";
import type { UserDTO } from "../services/user/dto/user.dto.js";

interface CurrentUser extends UserDTO {}

export interface RequestWithUser extends Request {
  user?: CurrentUser;
}
