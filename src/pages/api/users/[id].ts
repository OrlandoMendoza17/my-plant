// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import UsersController from "@/api/controllers/users.controller";
import { errorHandler } from "@/api/middleware/errorHandler";
import { CreateUserSchema, UserEmailSchema, UserIdSchema } from "@/api/schemas/User";
import createHttpError from "http-errors";
import type { NextApiRequest, NextApiResponse } from "next";

type ValidField = "userId" | "email"

const allowedMethods = (method: string) => {
  const HTTP_METHODS = [
    "GET",
    // "POST",
    // "PUT",
    "DELETE",
  ]
  return HTTP_METHODS.includes(method)
}

const allowedFields = (field: ValidField) => {
  const FIELDS = [
    "userId",
    "email",
  ]
  return FIELDS.includes(field)
}

const userHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {

    const user = new UsersController()
    const method = request.method as string
    const field = request.query.field as ValidField

    console.log('user handler')

    if (allowedMethods(method) && allowedFields(field)) {

      const getSchema = {
        userId: UserIdSchema,
        email: UserEmailSchema,
      }
      
      const Schema = getSchema[field]

      const validatedIdFormat = Schema.parse(request.query.id)
      const data = await user.findOne(validatedIdFormat, field)
      response.status(200).json(data);

    } else {
      throw new createHttpError.MethodNotAllowed("Bad Request!")
    }

  } catch (error) {
    errorHandler(error, request, response)
  }
}

export default userHandler;