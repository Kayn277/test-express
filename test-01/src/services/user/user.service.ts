import { hash } from "bcrypt";
import { prisma } from "../database/client.js";
import { createUserSchema, type CreateUserDTO } from "./dto/user.dto.js";

export async function getUser(userId: string) {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function getUserWithPhone(phoneNumber: string) {
  return prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
  });
}

export async function getUserWithEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function createUser(user: CreateUserDTO) {

  let { email, phoneNumber, password } = createUserSchema.parse(user);

  password = await hash(password, 10);

  return prisma.user.create({
    data: {
      email,
      phoneNumber,
      password,
    },
  });
}
