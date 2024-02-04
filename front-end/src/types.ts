import { z } from "zod";

export const product = z.object({
  id: z.string(),
  productName: z.string(),
  imageUrls: z
    .object({
      interior: z.string(),
      product: z.string(),
    })
    .nullable()
    .default(null),
  price: z.number().default(0),
  currencyCode: z.string().default("$"),
  avaliableFrom: z.string().datetime().nullable().default(null),
  distributor: z.object({
    distributorName: z.string(),
    streetName: z.string(),
    streetNumber: z.number(),
    city: z.string(),
  }),
});

export type Product = z.infer<typeof product>;

export const review = z.object({
  id: z.string(),
  author: z.object({
    name: z
      .string()
      .min(3, {
        message: "Name fiels should be at least 3 characters long",
      })
      .max(999, {
        message: "Name field should be not more that 999 characters long",
      }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    phone: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), 'Invalid number').optional(),
    isSaveToCookie: z.boolean().optional(),
  }),
  rating: z
    .number()
    .positive()
    .lte(5, { message: "this👏is👏too👏big" })
    .nullable()
    .default(null),
  creationDate: z.string().datetime(),
  comment: z
    .string()
    .min(3, {
      message: "Review comment should be at least 3 characters long",
    })
    .max(9999, {
      message: "Review comment should be not more that 9999 characters long",
    }),
});

export type Review = z.infer<typeof review>;
