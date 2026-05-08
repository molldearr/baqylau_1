import { create } from "zustand"
import {
    getExperiments,
    getExperimentById,
    searchExperimentsApi,
    createExperimentApi,
    type Experiment,
    type ExperimentCreate
} from "../api/experimentApi"

interface ExperimentStore {
    experiments: Experiment[]
    suggestions: Experiment[]
    currentExperiment?: Experiment
    loading: boolean
    experimentCreated: boolean

    fetchExperiments: () => Promise<void>
    fetchExperimentById: (id: string) => Promise<void>
    searchExperiment: (searchWord: string) => Promise<void>
    searchExperimentAutocomplete: (searchWord: string) => Promise<void>
    clearSuggestions: () => void
    createExperiment: (data: ExperimentCreate) => Promise<void>
}

export const useExperimentStore = create<ExperimentStore>((set) => ({
    experiments: [],
    suggestions: [],
    currentExperiment: undefined,
    loading: false,
    experimentCreated: false,

    fetchExperiments: async () => {
        set({ loading: true })
        try {
            const data = await getExperiments()
            set({ experiments: data })
        } finally {
            set({ loading: false })
        }
    },

    fetchExperimentById: async (id: string) => {
        set({ loading: true })
        try {
            const data = await getExperimentById(id)
            set({ currentExperiment: data })
        } finally {
            set({ loading: false })
        }
    },

    // 🔥 MAIN GRID SEARCH
    searchExperiment: async (searchWord: string) => {
        set({ loading: true })
        try {
            const data = await searchExperimentsApi(searchWord)
            set({ experiments: [] })
            set({ experiments: data })
        } finally {
            set({ loading: false })
        }
    },

    // 🔥 AUTOCOMPLETE SEARCH
    searchExperimentAutocomplete: async (searchWord: string) => {
        if (searchWord.length < 2) {
            set({ suggestions: [] })
            return
        }

        try {
            const data = await searchExperimentsApi(searchWord)
            set({ suggestions: data })
        } catch (error) {
            console.log(error)
        }
    },

    clearSuggestions: () => set({ suggestions: [] }),

    createExperiment: async (data) => {
    set({ loading: true })

    try {
        await createExperimentApi(data)

        const updatedExperiments = await getExperiments()

        set({
            experiments: updatedExperiments,
        })
    } finally {
        set({ loading: false })
    }
}
}))