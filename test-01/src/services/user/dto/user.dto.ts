import { parsePhoneNumber } from "libphonenumber-js/min";
import z from "zod";
import { zodPhoneNumber } from "../../../utils/zod.js";

export interface UserDTO {
  name: string;
  email: string;
  phoneNumber: string;
}

export const userSchema = z.object({
  name: z.string(),
  email: z.email(),
  phoneNumber: z.string().transform(zodPhoneNumber),
});

export interface CreateUserDTO {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}

export const createUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  phoneNumber: z.string().transform(zodPhoneNumber),
  password: z.string(),
});
