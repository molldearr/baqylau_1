import { create } from "zustand"
import {
    getDishById,
    getDishes,
    searchDishApi,
    type Dish
} from "../api/dishApi"

interface DishStore {
    dishes: Dish[]
    suggestions: Dish[]
    loading: boolean
    currentDish?: Dish

    fetchDishes: () => Promise<void>
    fetchDishById: (id: string) => Promise<void>

    searchDish: (searchWord: string) => Promise<void>
    searchDishAutocomplete: (searchWord: string) => Promise<void>
    clearSuggestions: () => void
}

export const useDishStore = create<DishStore>((set) => ({
    dishes: [],
    suggestions: [],
    loading: false,
    currentDish: undefined,

    fetchDishes: async () => {
        set({ loading: true })
        try {
            const data = await getDishes()
            set({ dishes: data })
        } finally {
            set({ loading: false })
        }
    },

    fetchDishById: async (id: string) => {
        set({ loading: true })
        try {
            const dish = await getDishById(id)
            set({ currentDish: dish })
        } finally {
            set({ loading: false })
        }
    },

    // 🔥 MAIN GRID SEARCH
    searchDish: async (searchWord: string) => {
        set({ loading: true })
        try {
            const data = await searchDishApi(searchWord)
            set({ dishes: [] })
            set({ dishes: data })
        } finally {
            set({ loading: false })
        }
    },

    // 🔥 AUTOCOMPLETE SEARCH
    searchDishAutocomplete: async (searchWord: string) => {
        if (searchWord.length < 2) {
            set({ suggestions: [] })
            return
        }

        try {
            const data = await searchDishApi(searchWord)
            set({ suggestions: data })
        } catch (error) {
            console.log(error)
        }
    },

    clearSuggestions: () => set({ suggestions: [] })
}))
