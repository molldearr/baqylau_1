import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import type { UserLogin } from "../../../api/userApi"
import { useUserStore } from "../../../store/userStore"

export const AdminLoginPage = () => {
    const navigate = useNavigate()

    const [loginForm, setLoginForm] = useState<UserLogin>({
        email: "admin@example.com",
        password: "admin123"
    })

    const { loginUser, loading } = useUserStore()
    const userLogined = useUserStore((state) => state.userLogined)

    useEffect(() => {
        if (userLogined) {
            navigate('/dashboard')
        }
    }, [userLogined])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await loginUser(loginForm)
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-8">
                <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Admin Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1">Email</label>
                        <input
                            type="text"
                            name="email"
                            value={loginForm.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-gray-700 font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={loginForm.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-gray-800 text-white p-3 rounded-lg font-medium hover:bg-gray-900 transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                    <div className="text-center text-sm text-gray-600 mt-2">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-gray-800 font-semibold hover:underline">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}