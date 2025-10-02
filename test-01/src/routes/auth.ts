import { Router, type Request, type Response } from "express";
import { withUserAuth } from "../services/auth/middleware/withUserAuth.js";
import { bodyZodValidate } from "../utils/validate-zod.js";
import { signupSchema, type SigninData } from "../services/auth/dto/auth.dto.js";
import expressAsyncHandler from "express-async-handler";
import { logout, signin, signup } from "../services/auth/auth.service.js";
import { parsePhoneNumber } from "libphonenumber-js/min";
import type { RequestWithUser } from "../utils/request-with-user.js";
import { updateJwtPair } from "../services/auth/jwt.service.js";

export const auth = Router();

auth.post("/signin", bodyZodValidate(signupSchema), expressAsyncHandler(async (req: Request, res: Response) => {
    const { id, password } = req.body;

    const baseData = {
        password,
        ip: req.ip ?? "",
        userAgent: req.headers['user-agent'] ?? ""
    }

    const phone = parsePhoneNumber(id);

    let signIn: SigninData = {
        type: "Email",
        email: id,
        ...baseData
    }


    if (phone.isValid()) {
        const phoneNumber = phone.formatInternational();
        signIn = {
            type: "Phone",
            phoneNumber,
            ...baseData
        }
    }

    const responseData = await signin(signIn);

    res.status(200).json(responseData);
}));

auth.post("/signin/new_token", expressAsyncHandler(async (req: Request, res: Response) => {
    if (req.cookies.refreshToken) {
        const jwtPair = await updateJwtPair(req.cookies.refreshToken);
        res.status(200).json(jwtPair);
    }
    else {
        res.sendStatus(401);
    }
}));

auth.post("/signup", bodyZodValidate(signupSchema),
    expressAsyncHandler(async (req: Request, res: Response) => {
        const { email, phoneNumber, password } = req.body;
        const responseData = await signup({ email, phoneNumber, password });
        res.status(201).json(responseData);
    })
);


auth.get("/logout", withUserAuth, expressAsyncHandler(async (req: RequestWithUser, res: Response) => {
    await logout(req.user!.accessToken);
}));
