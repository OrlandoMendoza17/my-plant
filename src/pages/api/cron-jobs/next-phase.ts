// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import cron from "node-cron";
import brevo from '@getbrevo/brevo'
import { CreateCronJob, CreateCronJobSchema } from "@/api/schemas/CronJobs";
import { frequency, PlantId } from "@/api/schemas/Plants";
import PlantService from "@/services/plants";

const BREVO_EMAIL_KEY = process.env.BREVO_EMAIL_KEY || ""

type BodyProps = {
  jobInfo: CreateCronJob,
  plantId: PlantId,
}

const handler = (request: NextApiRequest, response: NextApiResponse) => {

  const {jobInfo, plantId}: BodyProps = request.body
  
  const { user, jobName, frequencyTime } = CreateCronJobSchema.parse(jobInfo)

  const cronConfig = { name: jobName }

  const apiInstance = new brevo.TransactionalEmailsApi()

  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    BREVO_EMAIL_KEY
  )

  let sendSmtpEmail = new brevo.SendSmtpEmail();

  const base_url = "https://jtnrmwagncsharindxpw.supabase.co/storage/v1/object/public/my-plant-storage"

  const plant = new PlantService()
  
  cron.schedule(frequency[frequencyTime], async () => {

    console.log(`The job "${jobName}" executed at ${frequencyTime}`);

    const foundPlant = await plant.findOne(plantId, "plantId")
    
    await plant.update({
      ...foundPlant,
      ants: true,
    })
    
    sendSmtpEmail.subject = "Llegaron Bachacos a tu planta 🐜"
    sendSmtpEmail.to = [user]
    // { email: "marietsy.911.mm@gmail.com", name: "Marietsy Mendoza" },

    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <h1>Un enjambre de bachacos están atacando tu planta. Pronto elimínalas ❗❗</h1>
          <hr />
          <img src="${base_url}/bachaco.webp"/>
        </body>
      </html>
    `

    sendSmtpEmail.sender = {
      name: "My Plant 🌱",
      email: "no-responder@myplant.com"
    }

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log('result', result)

  }, cronConfig)

  response.status(200).json({ message: "successfull" });
}

export default handler;