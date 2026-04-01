import { create } from "zustand"
import { getDishById, getDishes, type Dish } from "../api/dish_api"

interface DishStore {
    dishes: Dish[]
    loading: boolean
    currentDish?: Dish
    fetchDishes: () => Promise<void>
    fetchDishById: (id: string) => Promise<void>
}

export const useDishStore = create<DishStore>((set) => ({
    dishes: [],
    loading: false,
    currentDish: undefined,

    fetchDishes: async () => {
        set({ loading: true })
        try {
            const data = await getDishes()
            set({ dishes: data })
        } catch (error) {
            console.error(error)
        } finally {
            set({ loading: false })
        }
    },

    fetchDishById: async (id: string) => {
        set({ loading: true })
        try {
            const dish = await getDishById(id)
            set({ currentDish: dish })
        } catch (error) {
            console.error(error)
        } finally {
            set({ loading: false })
        }
    }
}))
