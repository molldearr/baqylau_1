import { apiClientWithAuth } from "./axios"
import type { User } from "./userApi"

export const adminApi = {
    getAllUsers: async (): Promise<User[]> => {
        const { data } = await apiClientWithAuth.get<User[]>("/users/all")
        return data
    },
}
