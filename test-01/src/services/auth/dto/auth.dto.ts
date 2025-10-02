import z from "zod";
import { zodPhoneNumber } from "../../../utils/zod.js";

export interface SignupDto {
    email: string;
    phoneNumber: string;
    password: string;
}

export const signupSchema = z.object({
    email: z.email(),
    phoneNumber: z.string().transform(zodPhoneNumber),
    password: z.string(),
});


export interface SigninDto {
    id: string;
    password: string;
}

export const signinSchema = z.object({
    id: z.string(),
    password: z.string(),
});

interface SigninDataBase {
    password: string;
    userAgent: string;
    ip: string;
}

export interface SigninDataWithEmail extends SigninDataBase {
    type: "Email";
    email: string;
}

export interface SigninDataWithPhone extends SigninDataBase {
    type: "Phone";
    phoneNumber: string;
}

export type SigninData = SigninDataWithEmail | SigninDataWithPhone;
