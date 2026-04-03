import { create } from "zustand"
import { type Role, fetchAllRolesApi } from "../api/roleApi"

interface RoleStore {
  loading: boolean
  roles?: Role[]
  getAllRoles: () => Promise<void>
}

export const useRoleStore = create<RoleStore>((set) => ({
  loading: false,
  roles: undefined,

  getAllRoles: async () => {
    set({ loading: true })
    try {
      const data = await fetchAllRolesApi()
      set({ roles: data })
    } catch (error) {
      console.error(error)
    } finally {
      set({ loading: false })
    }
  },
}))
