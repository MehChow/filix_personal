import { z } from "zod";

export const selectSchema = z.object({
  category: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { message: "Please select a category" }
  ),
  productName: z.object(
    {
      label: z.string(),
      value: z.string(),
    },
    { message: "Please select a product" }
  ),
});

export type SelectSchema = z.infer<typeof selectSchema>;
