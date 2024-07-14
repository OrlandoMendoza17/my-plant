// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const SUPABASE_API_URL = process.env.NEXT_PUBLIC_SUPABASE_API_URL || ""
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || ""

const userHandler = async (request: NextApiRequest, response: NextApiResponse) => {
  response.json({
    SUPABASE_API_URL,
    SUPABASE_KEY,
  })
}

export default userHandler;