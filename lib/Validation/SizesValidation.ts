import { z } from "zod";

export const SizeSchema = z.object({
  name: z.string().min(1, { message: "cannot be empty." }),
  value: z.string().min(1, { message: "cannot be empty." }),
});

export type TSizeSchema = z.infer<typeof SizeSchema>;
