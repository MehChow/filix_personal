import { z } from "zod";

export const selectSchema = z.object({
  category: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { message: "errors.category_empty" }
  ),
  productName: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { message: "errors.product_empty" }
  ),
});

export type SelectSchema = z.infer<typeof selectSchema>;
