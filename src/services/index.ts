import axios from "axios"

export const base_url = ""

export const signUpUser = async () => {
  const { data } = await axios.post("/api/")
  return data
}