import { z } from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "cannot be empty." })
    .max(50, { message: "too long." }),
  billboardId: z.string().min(1, { message: "cannot be empty." }),
});

export type TCategorySchema = z.infer<typeof CategorySchema>;
