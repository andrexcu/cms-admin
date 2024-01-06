import { z } from "zod";

export const ColorSchema = z.object({
  name: z.string().min(1, { message: "cannot be empty." }),
  value: z
    .string()
    .min(4, { message: "must be a valid hex code" })
    .regex(/^#/, { message: "must be a valid hex code" }),
});

export type TColorSchema = z.infer<typeof ColorSchema>;
