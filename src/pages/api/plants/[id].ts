// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import PlantsController from "@/api/controllers/plants.controller";
import { errorHandler } from "@/api/middleware/errorHandler";
import { PlantIdSchema } from "@/api/schemas/Plants";
import createHttpError from "http-errors";
import type { NextApiRequest, NextApiResponse } from "next";

const allowedMethods = (method: string) => {
  const HTTP_METHODS = [
    "GET",
    // "POST",
    // "PUT",
    "DELETE",
  ]
  return HTTP_METHODS.includes(method)
}

const plantHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const plant = new PlantsController()
    const method = request.method as string

    console.log('plant handler')
    
    if (allowedMethods(method)) {
      
      const validatedIdFormat = PlantIdSchema.parse(request.query.id)
      const data = await plant.findOne(validatedIdFormat)
      response.status(200).json(data);

    } else {
      throw new createHttpError.MethodNotAllowed("Bad Request!")
    }
    
  } catch (error) {
    errorHandler(error, request, response)
  }
}

export default plantHandler;