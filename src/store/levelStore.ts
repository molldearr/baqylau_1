import { create } from "zustand"
import { getLevels, type Level } from "../api/levelApi"

interface LevelStore {
    levels: Level[]
    loading: boolean
    fetchLevels: () => Promise<void>
}

export const useLevelStore = create<LevelStore>((set) => ({
    levels: [],
    loading: false,

    fetchLevels: async () => {
        set({ loading: true })
        try {
            const data = await getLevels()
            set({ levels: data })
        } catch (error) {
            console.error(error)
        } finally {
            set({ loading: false })
        }
    }
}))