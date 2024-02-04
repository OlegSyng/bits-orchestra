import { z } from "zod";

export const product = z.object({
  id: z.string(),
  productName: z.string(),
  imageUrls: z.object({
    interior: z.string(),
    product: z.string(),
  }).nullable().default(null),
  price: z.number().default(0),
  currencyCode: z.string().default("$"),
  avaliableFrom: z.string().datetime().nullable().default(null),
  distributor: z
    .object({
      distributorName: z.string(),
      streetName: z.string(),
      streetNumber: z.number(),
      city: z.string(),
    })
});

export type Product = z.infer<typeof product>;
