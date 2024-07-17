import { CreateCronJob } from "@/api/schemas/CronJobs";
import API from "./api";
import { PlantId } from "@/api/schemas/Plants";

type CreateJob = {
  jobInfo: CreateCronJob,
  plantId: PlantId,
}

class CronJobService {
  create = {
    ants: async (jobInfo: CreateJob) => {
      await API.post("/api/cron-jobs/ants", jobInfo)
    },
    watering: async (jobInfo: CreateJob) => {
      await API.post("/api/cron-jobs/watering", jobInfo)
    },
  }
  stop = async (taskName: string) => {
    await API.delete(`/api/cron-jobs/stop?taskName=${taskName}`)
  }
}

export default CronJobService;