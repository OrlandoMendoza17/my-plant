// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const brevo = require('@getbrevo/brevo')

const BREVO_EMAIL_KEY = process.env.BREVO_EMAIL_KEY

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  try {
    const apiInstance = new brevo.TransactionalEmailsApi();

    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      BREVO_EMAIL_KEY,
    )

    let sendSmtpEmail = new brevo.SendSmtpEmail();

    sendSmtpEmail.subject = "Hola 😎"
    sendSmtpEmail.to = [
      { email: "alexanderrojas15121098@gmail.com", name: "Alexander Rojas" },
      { email: "nj13072004@gmail.com", name: "Jesus Ninin" },
    ]

    sendSmtpEmail.htmlContent = `
      <html>
        <body>
          <h1>Hola, aquí probando desde Brevo</h1>
          <hr />
          <img src="https://scontent.fmyc2-1.fna.fbcdn.net/v/t31.18172-8/1399766_863304847019692_7138271758297674211_o.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f798df&_nc_ohc=8uxf2ksAGpUQ7kNvgGT3zwm&_nc_ht=scontent.fmyc2-1.fna&oh=00_AYAj9HoUAzZ-V4Im2peXGldZsvNV3JBjDQ-oTyx0jiIuBA&oe=66AD1DAC"/>
        </body>
      </html>
    `

    sendSmtpEmail.sender = {
      name: "Desde Heinz",
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