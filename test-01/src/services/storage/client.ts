import * as Minio from "minio";
import { env } from "../../utils/env-validation.js";
import {
  fileSchema,
  updateSchema,
  type FileDTO,
  type UpdateFileDTO,
} from "./dto/file.dto.js";
import { prisma } from "../database/client.js";

const storageClient = new Minio.Client({
  endPoint: env.STORAGE_ENDPOINT,
  accessKey: env.STORAGE_ACCESS_KEY,
  secretKey: env.STORAGE_SECRET_KEY,
  port: env.STORAGE_PORT,
  useSSL: process.env.NODE_ENV === "production",
});

export async function createFile(userId: string, file: FileDTO) {
  return await prisma.$transaction(async (tx) => {
    fileSchema.parse(file);
    const [fileName, fileExtension] = file.originalname.split(".");
    if (!fileName) {
      throw new Error("Invalid file name");
    }

    const createdFile = await tx.file.create({
      data: {
        extension: fileExtension ?? "",
        mime: file.mimetype,
        name: fileName,
        size: BigInt(file.buffer.byteLength),
        userId,
      },
    });

    await storageClient.putObject(
      env.STORAGE_BUCKET_NAME,
      createdFile.id,
      file.buffer
    );

    return createdFile;
  });
}

export async function getFile(userId: string, id: string) {
  const file = await prisma.file.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!file) {
    throw new Error("File not found");
  }

  return storageClient.getObject(env.STORAGE_BUCKET_NAME, file.id);
}

export async function putFile(
  userId: string,
  fileId: string,
  file: UpdateFileDTO
) {
  await prisma.$transaction(async (tx) => {
    updateSchema.parse(file);

    const exists = await tx.file.findUnique({
      where: {
        id: fileId,
        userId,
      },
    });

    if (!exists) {
      throw new Error("File not found");
    }

    const [fileName, fileExtension] = file.originalname!.split(".");

    const updated = await tx.file.update({
      where: {
        id: fileId,
      },
      data: {
        extension: fileExtension ?? "",
        name: fileName ?? exists.name,
        mime: file.mimetype ?? exists.mime,
        size: BigInt(file.buffer.byteLength) ?? exists.size,
      },
    });

    await storageClient.removeObject(env.STORAGE_BUCKET_NAME, updated.id);

    await storageClient.putObject(
      env.STORAGE_BUCKET_NAME,
      updated.id,
      file.buffer
    );
  });
}

export async function initializeBucket() {
  const exists = await storageClient.bucketExists(env.STORAGE_BUCKET_NAME);
  if (!exists) {
    console.log("Create bucket: ", env.STORAGE_BUCKET_NAME);
    await storageClient.makeBucket(env.STORAGE_BUCKET_NAME);
  }
}
