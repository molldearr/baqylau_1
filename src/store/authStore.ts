import { create } from "zustand"
import { loginUserApi, registerUserApi } from "../api/userApi"
import type { User, UserCreate, UserLogin } from "../api/userApi"

interface AuthStore {
    user: User | null
    token: string | null
    loading: boolean

    register: (user: UserCreate) => Promise<boolean>
    login: (user: UserLogin) => Promise<boolean>
    logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: localStorage.getItem("token"),
    loading: false,

    register: async (user) => {
        try {
            set({ loading: true })

            await registerUserApi(user)

            set({ loading: false })
            return true
        } catch (error) {
            console.log(error)
            set({ loading: false })
            return false
        }
    },

    login: async (user) => {
        try {
            set({ loading: true })

            const data = await loginUserApi(user)

            localStorage.setItem("token", data.access_token)

            set({
                user: data.user,
                token: data.access_token,
                loading: false,
            })

            return true
        } catch (error) {
            console.log(error)
            set({ loading: false })
            return false
        }
    },

    logout: () => {
        localStorage.removeItem("token")

        set({
            user: null,
            token: null,
        })
    },
}))