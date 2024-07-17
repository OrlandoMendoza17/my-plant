// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { frequency } from "@/api/schemas/Plants";
import type { NextApiRequest, NextApiResponse } from "next";
import cron from "node-cron";
const brevo = require('@getbrevo/brevo')

type BodyProps = {
  name: string,
  frequencyTime: string,
}

const handler = (request: NextApiRequest, response: NextApiResponse) => {

  const { name, frequencyTime }: BodyProps = request.body

  const cronConfig = { name }

  const apiInstance = new brevo.TransactionalEmailsApi()

  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    "Q5Azj7VFchXPZILb"
  )

  let sendSmtpEmail = new brevo.SendSmtpEmail();

  cron.schedule(frequency[frequencyTime], async () => {

    console.log(`The job "${name}" at every ${frequencyTime}`);

    // sendSmtpEmail.subject = "Hola 😎"
    // sendSmtpEmail.to = [
    //   { email: "ommv.17@gmail.com", name: "Orlando Mendoza" },
    //   { email: "marietsy.911.mm@gmail.com", name: "Marietsy Mendoza" },
    // ]

    // sendSmtpEmail.htmlContent = `
    //   <html>
    //     <body>
    //       <h1>Hola, aquí probando desde Brevo</h1>
    //       <hr />
    //       <img width="100" height="100" src="https://scontent.fmyc2-1.fna.fbcdn.net/v/t31.18172-8/1399766_863304847019692_7138271758297674211_o.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f798df&_nc_ohc=8uxf2ksAGpUQ7kNvgGT3zwm&_nc_ht=scontent.fmyc2-1.fna&oh=00_AYAj9HoUAzZ-V4Im2peXGldZsvNV3JBjDQ-oTyx0jiIuBA&oe=66AD1DAC"/>
    //     </body>
    //   </html>
    // `
    
    // sendSmtpEmail.sender = {
    //   name: "Desde Heinz",
    //   email: "no-responder@gmail.com"
    // }
    
    // const result = await apiInstance.sendTransacEmail(sendSmtpEmail)
    // console.log('result', result)
    
  }, cronConfig)

  response.status(200).json({ message: "successfull" });
}

export default handler;