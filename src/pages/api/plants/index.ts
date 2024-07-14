// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import PlantsController from "@/api/controllers/plants.controller";
import { errorHandler } from "@/api/middleware/errorHandler";
import { CreatePlantSchema, PlantIdSchema, UpdatePlantSchema } from "@/api/schemas/Plants";
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

const plantHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const plant = new PlantsController()
  
    const method = request.method as string
  
    console.log('plant handler')
  
    if (allowedMethods(method)) {
  
      if (method === "GET") {
        const plants = await plant.getAll();
        response.status(200).json(plants);
      }
      
      if (method === "POST") {
        const validatedFormat = CreatePlantSchema.parse(request.body);
        const createdUser = await plant.create(validatedFormat);
        response.status(201).json(createdUser);
      }
      
      if (method === "PUT") {
        const validatedFormat = UpdatePlantSchema.parse(request.body)
        const updatedPlant = await plant.update(validatedFormat)
        response.status(200).json(updatedPlant);
      }
      
      if (method === "DELETE") {
        const validatedId = PlantIdSchema.parse(request.body.plantId);
        const data = await plant.delete(validatedId);
        response.status(204).json(data);
      }
      
    } else {
      throw new createHttpError.MethodNotAllowed("Bad Request!")
    }
  } catch (error) {
    errorHandler(error, request, response)
  }
}

export default plantHandler;