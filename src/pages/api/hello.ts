// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const SUPABASE_API_URL = process.env.SUPABASE_API_URL || ""
const SUPABASE_KEY = process.env.SUPABASE_KEY || ""

const userHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  response.json({
    SUPABASE_API_URL,
    SUPABASE_KEY,
    query: request.query
  })
}

export default userHandler;