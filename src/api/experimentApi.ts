import { apiClient, apiClientWithAuth } from "./axios"

export interface Experiment {
    id: string
    title: string
    description: string
    difficulty: "Easy" | "Medium" | "Hard"
    category: string
    duration_minutes: number
    steps: ExperimentStep[]
    expected_result: string
}

export interface ExperimentStep {
    id: string
    order: number
    instruction: string
}

export interface ExperimentCreate {
    title: string
    description: string
    difficulty: "Easy" | "Medium" | "Hard"
    category: string
    duration_minutes: number
    steps: string[]
    expected_result: string
}

export const getExperiments = async (): Promise<Experiment[]> => {
    const response = await apiClient.get("/experiments/all")
    return response.data
}

export const getExperimentById = async (id: string): Promise<Experiment> => {
    const response = await apiClient.get(`/experiments/${id}`)
    return response.data
}

export const searchExperimentsApi = async (searchWord: string): Promise<Experiment[]> => {
    const response = await apiClient.get(`/experiments/search?search_word=${searchWord}`)
    return response.data
}

export const createExperimentApi = async (data: ExperimentCreate): Promise<Experiment> => {
    const response = await apiClientWithAuth.post("/experiments/create", data)
    return response.data
}

export interface Experiment {
    id: string
    name: string
    description: string
    result: string
    cooking_time: number
    difficulty?: {
        id: string
        name: string
    }
}