import UserForm from "./components/UserForm"
import UserList from "./components/UserList"

export default function App() {
  return (
    <div className="app">
      <h1>User Manager</h1>
      <UserForm />
      <UserList />
    </div>
  )
}