import type { DiffEntry } from "util"
import { apiClient } from "./axios"

export interface DishImage {
    id: string
    image_path: string
}

export interface Ingredient {
    id: string
    title: string
}

export interface ReceiptIngredient {
    id: string
    receipt: Receipt
    ingredient: Ingredient
}

export interface Receipt {
    id: string
    title: string
    instructions: string
    cooking_time?: number
    calorie: string
    receipt_ingredients: ReceiptIngredient[]
}

export interface Comment {
    id: string
    text: string
}

export interface Kitchen {
    id: string
    title: string
}

export interface Difficulty {
    id: string
    name: string
}

export interface Dish {
    id: string
    name: string
    description: string
    difficulty?: Difficulty
    receipt?: Receipt | null
    images: DishImage[]
    comments: Comment[] | null
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

export const searchDishApi = async (searchWord: string): Promise<Dish[]> => {
    const response = await apiClient.get(`/dishes/search?search_word=${searchWord}`)
    return response.data
}
