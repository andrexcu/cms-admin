import { z } from "zod";

export const CategorySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Cannot be empty." })
    .max(50, { message: "Too long." }),
  billboardId: z
    .string()
    .min(1, { message: "Cannot be empty." })
    .max(50, { message: "Too long." }),
});

export type TCategorySchema = z.infer<typeof CategorySchema>;
