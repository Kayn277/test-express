import z from "zod";

export interface FileDTO {
  originalname: string;
  mimetype: string;
  buffer: Buffer;
}

export const fileSchema = z.object({
  mimetype: z.string(),
  originalname: z.string(),
  buffer: z.instanceof(Buffer),
});

export interface UpdateFileDTO
  extends Partial<Omit<FileDTO, "buffer">>,
  Pick<FileDTO, "buffer"> { }

export const updateSchema = z.object({
  mimetype: z.string().optional().nullable(),
  originalname: z.string().optional().nullable(),
  buffer: z.instanceof(Buffer),
});


export const paginationSchema = z.object({
  list_size: z.number().optional().nullable(),
  page: z.number().optional().nullable(),
})