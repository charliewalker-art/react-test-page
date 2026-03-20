import { useEffect, useState } from "react"
import { getRoles } from "../services/roleService"
import type { Role } from "../entities/Role"

interface RoleSelectProps {
  value: string
  onChange: (value: string) => void
}

export default function RoleSelect({ value, onChange }: RoleSelectProps) {
  const [roles, setRoles] = useState<Role[]>([])

  useEffect(() => {
    loadRoles()
  }, [])

  const loadRoles = async () => {
    try {
      const data = await getRoles()
      console.log("roles =", data)
      setRoles(data)
    } catch (error) {
      console.error("Erreur chargement roles :", error)
    }
  }

  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">fggggggggggggg role</option>

      {roles.map((role) => (
        <option key={role.id} value={role.id}>
          {role.name}
        </option>
      ))}
    </select>
  )
}