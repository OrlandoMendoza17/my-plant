import { z } from 'zod'

const UserSchema = z.object({
  userId: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  createdAt: z.string(),
})

export const UserIdSchema = UserSchema.shape.userId
export const UserEmailSchema = UserSchema.shape.email
export const CreateUserSchema = UserSchema.omit({ userId: true, createdAt: true })
export const UpdateUserSchema = UserSchema.partial()

export type User = z.infer<typeof UserSchema>
export type UserId = z.infer<typeof UserIdSchema>
export type UserEmail = z.infer<typeof UserEmailSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>

export type AuthCredentials = {
  user: User,
  // token: string,
}