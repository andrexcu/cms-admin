import { z } from "zod";

export const BillboardSchema = z.object({
  label: z.string().min(1, { message: "Label cannot be empty." }),
  imageUrl: z.string().min(1, { message: "Image is required." }),
});

export type TBillboardSchema = z.infer<typeof BillboardSchema>;
