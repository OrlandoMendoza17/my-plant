import axios from "axios"
import { base_url } from ".";
import { AuthCredentials, User, UserEmail } from "@/api/schemas/User";
// import authorizationConfig from "@/utils/authorizationConfig";

export type LoginRequest = {
  nombre: string,
  email: string,
  ficha: string,
}

class AuthService {
  login = async (email: UserEmail) => {
    const { data } = await axios.post<AuthCredentials>(`${base_url}/api/auth/login`, { email })
    return data;
  }
}

export default AuthService;