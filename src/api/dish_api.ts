import { apiClient } from "./axios"

export interface DishImage {
    id: string
    image_path: string
}

export interface Dish {
    id: string
    name: string
    description: string
    images: DishImage[]
}

export const getDishes = async (): Promise<Dish[]> => {
    const response = await apiClient.get("/dishes/all")
    return response.data
}

export const getDishById = async (id: string): Promise<Dish> => {
    const response = await apiClient.get(`/dishes/${id}`)
    return response.data
}
