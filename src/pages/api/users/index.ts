// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import UsersController from "@/api/controllers/users.controller";
import { errorHandler } from "@/api/middleware/errorHandler";
import { CreateUserSchema, UpdateUserSchema, UserEmailSchema, UserIdSchema } from "@/api/schemas/User";
import status from "http-status";
import createHttpError from "http-errors";
import type { NextApiRequest, NextApiResponse } from "next";

const { OK, CREATED, NO_CONTENT } = status

const allowedMethods = (method: string) => {
  const HTTP_METHODS = [
    "GET",
    "POST",
    "PUT",
    "DELETE",
  ]
  return HTTP_METHODS.includes(method)
}

const userHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const user = new UsersController()

    const method = request.method as string

    console.log('user handler')

    if (allowedMethods(method)) {

      if (method === "GET") {
        const users = await user.getAll()
        response.status(OK).json(users);
      }

      if (method === "POST") {
        const validatedFormat = CreateUserSchema.parse(request.body)
        const createdUser = await user.create(validatedFormat)
        response.status(CREATED).json(createdUser);
      }

      if (method === "PUT") {
        const validatedFormat = UpdateUserSchema.parse(request.body)
        const updatedUser = await user.update(validatedFormat)
        response.status(OK).json(updatedUser);
      }

      if (method === "DELETE") {
        const validatedId = UserIdSchema.parse(request.body.userId)
        const data = await user.delete(validatedId)
        response.status(NO_CONTENT).json(data);
      }

    } else {
      throw new createHttpError.MethodNotAllowed("Bad Request!")
    }
  } catch (error) {
    errorHandler(error, request, response)
  }
}

export default userHandler;