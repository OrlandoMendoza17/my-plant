import { CreatePlant, Plant, PlantId } from "@/api/schemas/Plants"
import API from "./api"

class PlantService{
  findOne = async (plantId: PlantId) => {
    const { data } = await API.post<Plant[]>(`/api/plants/${plantId}`)
    return data;
  }
  create = async (plantInfo: CreatePlant) => {
    const { data } = await API.post<Plant[]>(`/api/plants`, plantInfo)
    return data;
  }
}

export default PlantService;