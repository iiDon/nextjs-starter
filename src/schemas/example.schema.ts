import { z } from "zod";
import { Prisma } from "@/configs/prisma/generated";

export const createExampleSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export type CreateExampleType = z.infer<typeof createExampleSchema>;

export const updateExampleSchema = createExampleSchema.extend({
  id: z.string().min(1),
});

export type UpdateExampleType = z.infer<typeof updateExampleSchema>;

export const deleteExampleSchema = z.object({
  id: z.string().min(1),
});

export type DeleteExampleType = z.infer<typeof deleteExampleSchema>;


export type ExampleWithUser = Prisma.ExampleGetPayload<{
  include: {
    User: true;
  };
}>