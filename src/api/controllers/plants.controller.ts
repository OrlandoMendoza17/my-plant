import supabase from "@/supabase";
import createHttpError from "http-errors";
import { CreatePlant, FindPlantByField, PlantId, UpdatePlant } from "../schemas/Plants";
import { UserId } from "../schemas/User";

class PlantsController {
  getAll = async () => {
    const { data: Plants, error } = await supabase
      .from('Plants')
      .select('*')
    return Plants;
  }

  findOne = async (id: UserId | PlantId, field: FindPlantByField) => {
    const { data, error } = await supabase
      .from('Plants')
      .select('*')
      .eq(field, id)

    if (data?.length) {
      return data
    } else {
      console.log('error', error)
      throw createHttpError.NotFound("Plant not found!")
    }
  }
  
  create = async (plantInfo: CreatePlant) => {
    console.log('plantInfo', plantInfo)
    const { data, error } = await supabase.from('Plants')
      .insert([plantInfo])
      .select()

    if (error) {
      console.log('error', error)
      throw createHttpError.BadRequest(error.message)
    }

    return data;
  }
  
  update = async (plantInfo: UpdatePlant) => {
    const { plantId, ...rest } = plantInfo
    if (plantId) {

      const foundPlant = await this.findOne(plantId, "plantId")
      console.log('foundPlant', foundPlant)

      if (foundPlant) {
        const { data, error } = await supabase.from("Plants")
          .update(rest)
          .eq("plantId", plantId)
          .select()

        console.log('data', data)

        if (error) {
          console.log('error', error)
          throw createHttpError.BadRequest(error.message)
        }

        return data;
      } else {
        throw createHttpError.NotFound("Plant Not Found!")
      }
    }

  }
  
  delete = async (plantId: PlantId) => {
    const { data, error } = await supabase.from("Plants")
      .delete()
      .eq("plantId", plantId)

    if (error) {
      console.log('error', error)
      throw createHttpError.BadRequest(error.message)
    }

    return data;
  }
}

export default PlantsController;