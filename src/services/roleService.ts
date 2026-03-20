import api from "../config/api"
import type { Role } from "../entities/Role"

export const getRoles = async (): Promise<Role[]> => {
  const res = await api.get("/role")
  return res.data
}