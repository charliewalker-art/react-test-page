import { useState } from "react"
import { createUser } from "../services/userService"
import type { User } from "../entities/User"
import RoleSelect from "./RoleSelect"

export default function UserForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [roleId, setRoleId] = useState("")

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !email || !password || !roleId) {
      alert("Remplis tous les champs")
      return
    }

    const user: User = {
      name,
      email,
      password,
      role: {
        id: Number(roleId),
        name: ""
      }
    }

    try {
      const result = await createUser(user)
      console.log("user créé =", result)
      alert("Utilisateur créé avec succès")

      setName("")
      setEmail("")
      setPassword("")
      setRoleId("")
    } catch (error) {
      console.error("Erreur création user :", error)
      alert("Erreur lors de la création")
    }
  }

  return (
    <form onSubmit={submit}>
      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <RoleSelect value={roleId} onChange={setRoleId} />

      <button type="submit">Create User</button>
    </form>
  )
}