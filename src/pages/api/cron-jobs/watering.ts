// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cron from "node-cron";
import { CreateCronJob, CreateCronJobSchema } from "@/api/schemas/CronJobs";
import { frequencyTypes, PlantId, PlantPhase } from "@/api/schemas/Plants";
import PlantService from "@/services/plants";
import CronJobService from "@/services/cron-jobs";
const brevo = require('@getbrevo/brevo')

const BREVO_EMAIL_KEY = process.env.BREVO_EMAIL_KEY || ""

type BodyProps = {
  jobInfo: CreateCronJob,
  plantId: PlantId,
}

const handler = (request: NextApiRequest, response: NextApiResponse) => {

  const { jobInfo, plantId }: BodyProps = request.body

  const { user, jobName, frequencyTime } = CreateCronJobSchema.parse(jobInfo)

  const cronConfig = { name: jobName }

  const base_url = "https://jtnrmwagncsharindxpw.supabase.co/storage/v1/object/public/my-plant-storage"

  setTimeout(async () => {

    const plant = new PlantService()
    const jobService = new CronJobService()

    console.log(`The job "${jobName}" executed at ${frequencyTime}`);

    const foundPlant = await plant.findOne(plantId, "plantId")

    if (foundPlant.currentPhase < 7) {

      const ZERO_PHASE = 0
      const FIRST_PHASE = 1
      const SECOND_PHASE = 2
      const THIRD_PHASE = 3
      const FOURTH_PHASE = 4
      const FIFTH_PHASE = 5
      const SIXTH_PHASE = 6
      const SEVENTH_PHASE = 7

      const fases: PlantPhase[] = [
        ZERO_PHASE,
        FIRST_PHASE,
        SECOND_PHASE,
        THIRD_PHASE,
        FOURTH_PHASE,
        FIFTH_PHASE,
        SIXTH_PHASE,
        SEVENTH_PHASE,
      ]

      await plant.update({
        ...foundPlant,
        currentPhase: fases[foundPlant.currentPhase + 1],
      })

      const apiInstance = new brevo.TransactionalEmailsApi()

      apiInstance.setApiKey(
        brevo.TransactionalEmailsApiApiKeys.apiKey,
        BREVO_EMAIL_KEY
      )

      let sendSmtpEmail = new brevo.SendSmtpEmail();

      sendSmtpEmail.subject = "Regado de tu planta 💦"
      sendSmtpEmail.to = [user]
      // { email: "marietsy.911.mm@gmail.com", name: "Marietsy Mendoza" },

      sendSmtpEmail.htmlContent = `
        <html>
          <body>
            <h1>Tu planta ha sido regada 🚿🌱</h1>
            <hr />
            <img style="width: 100%" src="${base_url}/watering.jpeg"/>
          </body>
        </html>
      `

      sendSmtpEmail.sender = {
        name: "My Plant 🌱",
        email: "ommv.17@gmail.com"
      }

      const result = await apiInstance.sendTransacEmail(sendSmtpEmail)
      console.log('result', result)
      console.log("Se envió el correo de regado 🚿")

    }

    // await jobService.stop(jobName)

    await jobService.create.ants({
      jobInfo: {
        user,
        jobName: `ants-${user.email}`,
        frequencyTime: "ONE_MINUTE",
      },
      plantId,
    })
    
  }, frequencyTypes[frequencyTime])

  response.status(200).json({ message: "successfull" });
}

export default handler;