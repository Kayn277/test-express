import z from "zod";

export interface FileDTO {
  originalName: string;
  mimetype: string;
  buffer: Buffer;
}

export const fileSchema = z.object({
  mimetype: z.string(),
  originalName: z.string(),
  buffer: z.instanceof(Buffer),
});

export interface UpdateFileDTO
  extends Partial<Omit<FileDTO, "buffer">>,
    Pick<FileDTO, "buffer"> {}

export const updateSchema = z.object({
  mimetype: z.string().optional().nullable(),
  originalName: z.string().optional().nullable(),
  buffer: z.instanceof(Buffer),
});
