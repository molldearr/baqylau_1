import { apiClientWithAuth } from "./axios"

export interface Role {
  id: string
  name: string
}

export const fetchAllRolesApi = async (): Promise<Role[]> => {
  const response = await apiClientWithAuth.get("/roles/all")
  return response.data
}
