import { z } from 'zod'

const taskTypes = []

const TaskSchema = z.object({
  taskId: z.string().uuid(),
  plantId: z.string().uuid(),
  createdAt: z.string(),
  type: z.union([z.literal("fertilizer"), z.literal("watering"), z.literal("ants"), z.literal("bees")]),
  isActive: z.boolean(),
  time: z.number(),
})

export const TaskIdSchema = TaskSchema.shape.taskId
export const TaskTypeSchema = TaskSchema.shape.type
export const CreateTaskSchema = TaskSchema.omit({ taskId: true, createdAt: true })
export const UpdateTaskSchema = TaskSchema.partial()

export type TaskId = z.infer<typeof TaskIdSchema>
export type TaskType = z.infer<typeof TaskTypeSchema>
export type CreateTask = z.infer<typeof CreateTaskSchema>
export type UpdateTask = z.infer<typeof UpdateTaskSchema>