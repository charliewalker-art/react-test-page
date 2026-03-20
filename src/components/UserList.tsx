import { useEffect, useState } from "react"
import { getUsers, deleteUser } from "../services/userService"
import type { User } from "../entities/User"

export default function UserList() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setIsLoading(true)

    try {
      const data = await getUsers()
      console.log("users =", data)
      setUsers(data)
    } catch (error) {
      console.error("Erreur chargement users :", error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeUser = async (id: number) => {
    try {
      await deleteUser(id)
      loadUsers()
    } catch (error) {
      console.error("Erreur suppression user :", error)
    }
  }

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("")

  return (
    <section className="user-list rounded-6 border border-[#2f4b8f] bg-[#0b1d47] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.25)]">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-cyan-300/80">
            Team Directory
          </p>
          <h2 className="m-0 text-3xl font-bold text-white">
            Liste des utilisateurs
          </h2>
          <p className="mt-2 text-sm text-slate-300">
            Vue claire des comptes enregistres et de leur role.
          </p>
        </div>

        <div className="inline-flex w-fit items-center gap-3 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-100">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
          {users.length} utilisateur{users.length > 1 ? "s" : ""}
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-5 border border-white/10 bg-white/5 px-4 py-10 text-center text-slate-300">
          Chargement des utilisateurs...
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-5 border border-dashed border-cyan-300/30 bg-[#091633] px-4 py-10 text-center">
          <p className="m-0 text-lg font-semibold text-white">
            Aucun utilisateur trouve
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Cree un utilisateur avec le formulaire pour le voir apparaitre ici.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {users.map((user) => (
            <article
              key={user.id}
              className="user-card group relative overflow-hidden rounded-5 border border-white/10 bg-[linear-gradient(180deg,rgba(16,36,82,0.96),rgba(8,20,50,0.96))] p-5 transition duration-200 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            >
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-300/10 blur-3xl transition duration-200 group-hover:bg-cyan-300/20" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-4 bg-cyan-300/15 text-lg font-bold text-cyan-200">
                    {getInitials(user.name)}
                  </div>

                  <div>
                    <h3 className="m-0 text-lg font-semibold text-white">
                      {user.name}
                    </h3>
                    <p className="mt-1 text-sm text-slate-300">#{user.id}</p>
                  </div>
                </div>

                <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan-100">
                  {user.role?.name || "Sans role"}
                </span>
              </div>

              <div className="relative mt-5 space-y-3 text-sm text-slate-200">
                <div className="rounded-4 bg-white/5 px-3 py-2">
                  <p className="m-0 text-xs uppercase tracking-[0.2em] text-slate-400">
                    Email
                  </p>
                  <p className="mt-1 break-all text-sm text-white">{user.email}</p>
                </div>

                <div className="rounded-4 bg-white/5 px-3 py-2">
                  <p className="m-0 text-xs uppercase tracking-[0.2em] text-slate-400">
                    Password
                  </p>
                  <p className="mt-1 font-mono text-sm text-white">
                    {user.password}
                  </p>
                </div>
              </div>

              <div className="relative mt-5 flex justify-end">
                <button
                  className="rounded-full border border-red-300/30 bg-red-400/10 px-4 py-2 text-sm font-medium text-red-100 transition hover:border-red-300/50 hover:bg-red-400/20"
                  onClick={() => removeUser(user.id!)}
                >
                  Supprimer
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
