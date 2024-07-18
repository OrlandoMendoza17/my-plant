import { z } from 'zod'

const ONE_SECOND = 1000
const ONE_MINUTE = 60 * ONE_SECOND
const FIVE_MINUTES = 5 * ONE_MINUTE

const ONE_HOUR = 60 * ONE_MINUTE
const ONE_DAY = 24 * ONE_HOUR
const FIFTEEN_DAYS = 15 * ONE_DAY
const THIRTY_DAYS = 30 * ONE_DAY

export const frequencyTypes = {
  FIVE_SECONDS: 5 * ONE_SECOND,
  ONE_MINUTE: ONE_MINUTE,
  FIVE_MINUTES: FIVE_MINUTES,
  FIFTEEN_DAYS: FIFTEEN_DAYS,
  THIRTY_DAYS: THIRTY_DAYS,
}

export const PlantFrequencySchema = z.union([
  z.literal("FIVE_SECONDS"),
  z.literal("ONE_MINUTE"),
  z.literal("FIVE_MINUTES"),
  z.literal("FIFTEEN_DAYS"),
  z.literal("THIRTY_DAYS")
])

export type PlantFrequency = z.infer<typeof PlantFrequencySchema>

const PlantSchema = z.object({
  plantId: z.string().uuid(),
  currentPhase: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
    z.literal(7),
  ]),
  ants: z.boolean(),
  bees: z.boolean(),
  userId: z.string().uuid(),
  state: z.union([z.literal("GOOD"), z.literal("WARNING"), z.literal("BAD")]),
  frequency: PlantFrequencySchema,
  createdAt: z.string(),
})

export const PlantIdSchema = PlantSchema.shape.plantId
export const CreatePlantSchema = PlantSchema.omit({ plantId: true, createdAt: true })
export const UpdatePlantSchema = PlantSchema.partial()
export const FindPlantByFieldSchema = z.union([z.literal("userId"), z.literal("plantId")])
export const PlantPhaseSchema = PlantSchema.shape.currentPhase

export type Plant = z.infer<typeof PlantSchema>
export type PlantId = z.infer<typeof PlantIdSchema>
export type CreatePlant = z.infer<typeof CreatePlantSchema>
export type UpdatePlant = z.infer<typeof UpdatePlantSchema>
export type FindPlantByField = z.infer<typeof FindPlantByFieldSchema>
export type PlantPhase = z.infer<typeof PlantPhaseSchema>