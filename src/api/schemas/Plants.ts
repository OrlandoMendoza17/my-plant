import { z } from 'zod'

const PlantSchema = z.object({
  plantId: z.string().uuid(),
  currentPhase: z.number().min(1).max(7),
  ants: z.boolean(),
  bees: z.boolean(),
  userId: z.string().uuid(),
  state: z.union([z.literal("GOOD"), z.literal("WARNING"), z.literal("BAD")]),
  createdAt: z.string(),
})

export const PlantIdSchema = PlantSchema.shape.plantId
export const CreatePlantSchema = PlantSchema.omit({ plantId: true, createdAt: true })
export const UpdatePlantSchema = PlantSchema.partial()
export const FindPlantByFieldSchema = z.union([z.literal("userId"), z.literal("plantId")])

export type Plant = z.infer<typeof PlantSchema>
export type PlantId = z.infer<typeof PlantIdSchema>
export type CreatePlant = z.infer<typeof CreatePlantSchema>
export type UpdatePlant = z.infer<typeof UpdatePlantSchema>
export type FindPlantByField = z.infer<typeof FindPlantByFieldSchema>