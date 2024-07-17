import { z } from "zod"
import { frequency, PlantFrequencySchema } from "./Plants"

export const CreateCronJobSchema = z.object({
  user: z.object({
    name: z.string(),
    email: z.string().email(),
  }),
  jobName: z.string(),
  frequencyTime: PlantFrequencySchema,
})

export const StopCronJobSchema = {
  
}

export type CreateCronJob = z.infer<typeof CreateCronJobSchema>