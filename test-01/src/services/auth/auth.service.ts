import type { Request, Response } from "express";
import type { SigninData, SignupDto } from "./dto/auth.dto.js";
import { createUser, getUserWithEmail, getUserWithPhone } from "../user/user.service.js";
import { id } from "zod/locales";
import { compare } from "bcrypt";
import { removeSession } from "./jwt.service.js";

export async function signin(signinData: SigninData) {
    const user = signinData.type === "Phone" ? await getUserWithPhone(signinData.phoneNumber) : await getUserWithEmail(signinData.email);

    if (user) {
        const compared = await compare(signinData.password, user.password);
        if (compared) {

        }
    }
    else {
        throw new Error("User not found");
    }
}

export async function signup(signupData: SignupDto) {
    const { id, ...user } = await createUser(signupData);
    return {
        id
    }
}

export async function newToken() { }

export async function logout(accessToken: string) {
    return removeSession(accessToken);
}
