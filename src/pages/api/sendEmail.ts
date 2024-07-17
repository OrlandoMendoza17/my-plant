// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const brevo = require('@getbrevo/brevo')

const BREVO_EMAIL_KEY = process.env.BREVO_EMAIL_KEY || ""

const base_url = "https://jtnrmwagncsharindxpw.supabase.co/storage/v1/object/public/my-plant-storage"

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const user = request.body
    
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      BREVO_EMAIL_KEY,
    )

    let sendSmtpEmail = new brevo.SendSmtpEmail();

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
      email: "ommv.17@gmail.com"
    }

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail)
    console.log('result', result)

    response.status(200).json({ message: "successfull" });

  } catch (error) {
    console.error('error', error)
    response.status(500).json({ message: "There has been an error in the server" });
  }
}

export default handler;
