import { apiClient } from "./axios"

export interface DishImage {
    id: string
    image_path: string
}

export interface Receipt {
    id: string
    title: string
    instructions: string
    cooking_time?: number
    calorie: string
    difficulty?: string
}

export interface Comment {
    id: string
    text: string
}

export interface Kitchen {
    id: string
    name: string
}

export interface Dish {
    id: string
    name: string
    description: string
    receipt?: Receipt | null
    images: DishImage[]
    comments: Comment[]
    kitchen?: Kitchen | null
    value?: number
}

export const getDishes = async (): Promise<Dish[]> => {
    const response = await apiClient.get("/dishes/all")
    return response.data
}

export const getDishById = async (id: string): Promise<Dish> => {
    const response = await apiClient.get(`/dishes/${id}`)
    return response.data
}