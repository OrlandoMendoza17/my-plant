import { z } from 'zod'

const TaskSchema = z.object({
  taskId: z.string().uuid(),
  plantId: z.string().uuid(),
  createdAt: z.string(),
  type: z.string(), // "fertilizer" | "watering" | "ants" | "bees"
  isActive: z.boolean(),
  time: z.number(),
})

export const TaskIdSchema = TaskSchema.shape.taskId
export const CreateTaskSchema = TaskSchema.omit({ taskId: true, createdAt: true })
export const UpdateTaskSchema = TaskSchema.partial()

export type TaskId = z.infer<typeof TaskIdSchema>
export type CreateTask = z.infer<typeof CreateTaskSchema>
export type UpdateTask = z.infer<typeof UpdateTaskSchema>