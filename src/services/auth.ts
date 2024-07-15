import API from "./api";
import { AuthCredentials, User, UserEmail } from "@/api/schemas/User";

// import authorizationConfig from "@/utils/authorizationConfig";

export const UserAlreadyExits = "user-already-exits"

export type LoginRequest = {
  nombre: string,
  email: string,
  ficha: string,
}

class AuthService {
  login = async (email: UserEmail, field: "userId" | "email" = "email"): Promise<AuthCredentials> => {

    const { data } = await API.get<User[]>(`/api/users/${email}?field=${field}`)
    const credentials = { user: data[0] }
    
    return credentials;
  }
  
  create = async (userInfo: { name: string, email: string }) => {
    
    const { data } = await API.post<User[]>(`/api/users`, userInfo)
    const credentials = { user: data[0] }
    
    return credentials;
  }
}

export default AuthService;