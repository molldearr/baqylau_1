import { create } from "zustand"
import type { User } from "../api/userApi"
import { adminApi } from "../api/adminApi"

interface AdminStore {
    token: string | null
    userLogined: boolean
    users: User[]
    loading: boolean
    fetchUsers: () => Promise<void>
    addUser: (user: Omit<User, "id">) => void
    deleteUser: (id: string) => void
    logout: () => void
}

export const useAdminStore = create<AdminStore>((set, get) => ({
    token: localStorage.getItem("token"),
    users: [],
    userLogined: !!localStorage.getItem("token"),
    loading: false,

    fetchUsers: async () => {
        set({ loading: true })
        try {
            const users = await adminApi.getAllUsers()
            set({ users })
        } catch (err) {
            console.error("Failed to fetch users:", err)
        } finally {
            set({ loading: false })
        }
    },

    addUser: (user: Omit<User, "id">) => {
        const newUser: User = { ...user, id: (get().users.length + 1).toString() }
        set({ users: [...get().users, newUser] })
    },

    deleteUser: (id: string) => {
        set({ users: get().users.filter(u => u.id !== id) })
    },

    logout: () => {
        localStorage.removeItem("token")
        set({ token: null, userLogined: false })
    },
}))
