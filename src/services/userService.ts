import api from "../config/api"
import type { User } from "../entities/User"

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/users")
  return res.data
}

export const createUser = async (user: User): Promise<User> => {
  const res = await api.post("/users", user)
  return res.data
}

export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}`)
}