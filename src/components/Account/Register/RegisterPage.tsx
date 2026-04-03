import { useState } from "react"
import { Link } from "react-router-dom"
import iconImage from "../../../assets/icon.svg"
import { useUserStore } from "../../../store/userStore"
import { type UserCreate } from "../../../api/userApi"

export const RegisterPage = () => {
  const [form, setForm] = useState<UserCreate>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  })

  const { registerUser, loading, userRegistered } = useUserStore()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await registerUser(form)
  }

  return (
    <div className="min-h-screen bg-[#fceef6] flex flex-col items-center justify-center gap-5">
      <div className="flex justify-center items-center gap-3">
        <button className="bg-[#ef1d8a] rounded-[10px] w-10 h-10 flex items-center justify-center">
          <img src={iconImage} className="h-6 w-6" />
        </button>
        <span className="font-bold">RecipeHub</span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white p-6 rounded-2xl gap-3 w-full max-w-md"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[#892d72] font-[600] text-2xl">Sign up</span>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <label className="font-bold">First Name</label>
            <input
              type="text"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="bg-[#f3f3f5] rounded-2xl p-3 border-none focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="bg-[#f3f3f5] rounded-2xl p-3 border-none focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold">Email</label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="bg-[#f3f3f5] rounded-2xl p-3 border-none focus:outline-none focus:ring-0"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="bg-[#f3f3f5] rounded-2xl p-3 border-none focus:outline-none focus:ring-0"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#e60076] rounded-2xl text-white w-full p-3 mt-2"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          {userRegistered && (
            <span className="text-green-600 mt-2 text-center">User successfully registered!</span>
          )}

          <div className="flex gap-3 justify-center mt-2">
            <span>Already have an account?</span>
            <Link to="/login" className="font-bold text-[#ec479c]">
              Login here
            </Link>
          </div>
        </div>
      </form>
    </div>
  )
}
