import { create } from "zustand"
import { registerUserApi, type UserCreate, type User, loginUserApi, type UserLogin } from "../api/userApi"

interface UserStore {
  loading: boolean
  userRegistered: boolean
  userLogined: boolean
  user?: User
  registerUser: (userData: UserCreate) => Promise<void>
  loginUser: (userData: UserLogin) => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  loading: false,
  userRegistered: false,
  userLogined: false,
  user: undefined,

  registerUser: async (userData: UserCreate) => {
    set({ loading: true })
    try {
      const data = await registerUserApi(userData)
      set({ userRegistered: true, user: data })
    } catch (error) {
      console.error(error)
      set({ userRegistered: false })
    } finally {
      set({ loading: false })
    }
  },

  loginUser: async (userData: UserLogin) => {
    set({ loading: true })

    try {
      const data = await loginUserApi(userData)
      localStorage.setItem('token', data.access_token)
      set({ userLogined: true, user: data.user })
    } catch (error) {
      console.error(error)
      set({ userLogined: false })
    } finally {
      set({ loading: false })
    }
  }
}))
