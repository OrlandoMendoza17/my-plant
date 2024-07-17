import { CreatePlant, FindPlantByField, Plant, PlantId, UpdatePlant } from "@/api/schemas/Plants"
import API from "./api"
import { UserId } from "@/api/schemas/User";

class PlantService{
  findOne = async (id: PlantId | UserId, field: FindPlantByField) => {
    const { data } = await API.get<Plant[]>(`/api/plants/${id}?field=${field}`)
    return data[0];
  }
  create = async (plantInfo: CreatePlant) => {
    const { data } = await API.post<Plant[]>(`/api/plants`, plantInfo)
    return data;
  }
  update = async (plantInfo: UpdatePlant) => {
    const { data } = await API.put<Plant[]>(`/api/plants`, plantInfo)
    return data[0];
  }
}

export default PlantService;