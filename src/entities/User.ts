import type { Role } from "./Role"

export interface User {
  id?: number
  name: string
  email: string
  password: string
  role: Role
}