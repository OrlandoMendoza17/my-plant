// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import PlantService from "@/services/plants";
import type { NextApiRequest, NextApiResponse } from "next";

const SUPABASE_API_URL = process.env.SUPABASE_API_URL || ""
const SUPABASE_KEY = process.env.SUPABASE_KEY || ""

const userHandler = async (request: NextApiRequest, response: NextApiResponse) => {

  const ONE_SECOND = 1000
  const ONE_MINUTE = 60 * ONE_SECOND
  const ONE_HOUR = 60 * ONE_MINUTE
  const ONE_DAY = 24 * ONE_HOUR

  const plant = new PlantService()
  const found = await plant.findOne("6f185d0b-4393-4970-839a-91ba7cec12b0", "userId")
  
  console.log('found :>> ', found);
  
  // setTimeout(async () => {
  //   console.log('hola')
  // }, ONE_MINUTE / 6);

  response.json({
    message: "Successfully scheduled!"
  })
  // response.json({
  //   SUPABASE_API_URL,
  //   SUPABASE_KEY,
  //   query: request.query
  // })
}

export default userHandler;