import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, { message: "is required" }),
  images: z
    .array(z.object({ url: z.string().min(1, { message: "is required" }) }))
    .refine((arr) => arr.length >= 1, {
      message: "at least one image URL is required",
    }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  price: z.coerce.number().min(1, { message: "is required" }),
  categoryId: z.string().min(1, { message: "is required" }),
  sizeId: z.string().min(1, { message: "is required" }),
  colorId: z.string().min(1, { message: "is required" }),
});

export type TProductSchema = z.infer<typeof ProductSchema>;
