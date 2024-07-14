// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import TasksController from "@/api/controllers/tasks.controller";
import { errorHandler } from "@/api/middleware/errorHandler";
import { CreateTaskSchema, TaskIdSchema, UpdateTaskSchema } from "@/api/schemas/Tasks";
import createHttpError from "http-errors";
import type { NextApiRequest, NextApiResponse } from "next";

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
    const task = new TasksController()
  
    const method = request.method as string
  
    console.log('task handler')
  
    if (allowedMethods(method)) {
  
      if (method === "GET") {
        const tasks = await task.getAll()
        response.status(200).json(tasks);
      }
  
      if (method === "POST") {
        const validatedFormat = CreateTaskSchema.parse(request.body)
        const createdTask = await task.create(validatedFormat)
        response.status(201).json(createdTask);
      }
      
      if (method === "PUT") {
        const validatedFormat = UpdateTaskSchema.parse(request.body)
        const updatedTask = await task.update(validatedFormat)
        response.status(200).json(updatedTask);
      }
      
      if (method === "DELETE") {
        const validatedId = TaskIdSchema.parse(request.body.taskId)
        const data = await task.delete(validatedId)
        response.status(204).json(data);
      }
  
    } else {
      throw new createHttpError.MethodNotAllowed("Bad Request!")
    }
  } catch (error) {
    errorHandler(error, request, response)
  }
}

export default userHandler;