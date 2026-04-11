import { apiClient } from "./axios"

export interface Level {
    id: string
    name: string
}

export const getLevels = async (): Promise<Level[]> => {
    const response = await apiClient.get("/levels/all")
    return response.data
}

export const createLevel = async (name: string): Promise<Level> => {
    const response = await apiClient.post("/levels/new", { name })
    return response.data
}