import { Link, useNavigate } from "react-router-dom"
import iconImage from "../../../assets/icon.svg"
import { useState } from "react"
import type { UserLogin } from "../../../api/userApi"
import { useAuthStore } from "../../../store/authStore"

export const LoginPage = () => {
    const navigate = useNavigate()

    const [loginForm, setLoginForm] = useState<UserLogin>({
        email: "",
        password: ""
    })

    const { login, loading } = useAuthStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const success = await login(loginForm)

        if (success) {
            navigate("/")
        } else {
            alert("Неверный email или пароль")
        }
    }

    return (
        <div className="min-h-screen bg-[#fceef6] flex flex-col items-center justify-center gap-5">
            <div className="flex justify-center items-center gap-3">
                <button className="bg-pink-400 rounded-[10px] w-10 h-10 flex items-center justify-center">
                    <img src={iconImage} className="h-6 w-6" />
                </button>

                <span className="font-bold">Recipe&Dear</span>
            </div>

            <form
                action=""
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col bg-white p-6 rounded-2xl gap-3">
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-[#892d72] font-[600] text-2xl">𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐁𝐚𝐜𝐤𐙚 ̊</span>
                        
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-3">
                            <label className="font-bold">Email or Username</label>
                            <input
                                type="text"
                                value={loginForm.email}
                                name="email"
                                onChange={handleChange}
                                placeholder="Enter your email or username"
                                className="bg-[#f3f3f5] rounded-2xl p-3 border-none focus:outline-none focus:ring-0"
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="font-bold">Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                name="password"
                                value={loginForm.password}
                                onChange={handleChange}
                                className="bg-[#f3f3f5] rounded-2xl p-3 border-none focus:outline-none focus:ring-0"
                            />
                        </div>

                        <div className="flex">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-pink-400 rounded-2xl text-white w-full p-3"
                            >
                                {loading ? "Logining..." : "Login𐙚 ̊"}
                            </button>
                        </div>

                        <div className="flex gap-3">
                            <span>Don't have an account?</span>
                            <Link to="/register" className="font-bold text-pink-400">Register here</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}