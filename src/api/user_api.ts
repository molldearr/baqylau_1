import { apiClient } from "./axios"

export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
}

export interface UserCreate {
  first_name: string
  last_name: string
  email: string
  password: string
}

// POST-запрос на регистрацию с body
export const registerUserApi = async (user: UserCreate): Promise<User> => {
  const response = await apiClient.post("/users/register", user)
  return response.data
}

export interface TokenResponse {
  user: User
  access_token: string
  token_type: string
}

export interface UserLogin {
  email: string
  password: string
}

export const loginUserApi = async (user: UserLogin): Promise<TokenResponse> => {
  const response = await apiClient.post("/users/login", user)
  return response.data
}
