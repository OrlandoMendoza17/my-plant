// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import TasksController from "@/api/controllers/tasks.controller";
import { errorHandler } from "@/api/middleware/errorHandler";
import { TaskIdSchema } from "@/api/schemas/Tasks";
import createHttpError from "http-errors";
import type { NextApiRequest, NextApiResponse } from "next";

const allowedMethods = (method: string) => {
  const HTTP_METHODS = [
    "GET",
    // "POST",
    // "PUT",
    // "DELETE",
  ]
  return HTTP_METHODS.includes(method)
}

const userHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const user = new TasksController()
    const method = request.method as string

    console.log('user handler')
    
    if (allowedMethods(method)) {
      
      const validatedIdFormat = TaskIdSchema.parse(request.query.id)
      const data = await user.findOne(validatedIdFormat)
      response.status(200).json(data);

    } else {
      throw new createHttpError.MethodNotAllowed("Bad Request!")
    }
    
  } catch (error) {
    errorHandler(error, request, response)
  }
}

export default userHandler;