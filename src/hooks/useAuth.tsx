import { AuthCredentials, User } from "@/api/schemas/User"
import { getCookie } from "@/utils/cookies"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const initializedUser: User = {
  userId: "",
  name: "",
  email: "",
  createdAt: "",
}

const useAuth = (): [boolean, AuthCredentials] => {

  const router = useRouter()

  const [renderPage, setRenderPage] = useState<boolean>(false)
  const [credentials, setCredentials] = useState<AuthCredentials>({
    user: initializedUser,
    // token: "",
  })

  useEffect(() => {
    const credentials = getCookie<AuthCredentials>("login")
    if (credentials) {
      
      const { user } = credentials

      setCredentials(credentials)
      setRenderPage(true)

    } else {
      router.push("/sign-in")
    }
  }, [])

  return [renderPage, credentials];
}

export default useAuth;