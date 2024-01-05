import { z } from "zod";

export const BillboardSchema = z.object({
  label: z
    .string()
    .min(1, { message: "cannot be empty." })
    .max(150, { message: "too long." }),
  imageUrl: z.string().min(1, { message: "is required." }),
});

export type TBillboardSchema = z.infer<typeof BillboardSchema>;
