import { Link, useNavigate } from "react-router-dom"
import iconImage from "../../../assets/icon.svg"
import { useEffect, useState } from "react"
import type { UserLogin } from "../../../api/userApi"
import { useUserStore } from "../../../store/userStore"

export const LoginPage = () => {
    const navigate = useNavigate()

    const [ loginForm, setLoginForm ] = useState<UserLogin>({
        email: "",
        password: ""
    })

    const { loginUser, loading } = useUserStore()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await loginUser(loginForm)

    }
    
    const userLogined = useUserStore((state) => state.userLogined)
    
    useEffect(() => {
        if (userLogined) {
            navigate('/')
        }
    }, [userLogined])

    return (
        <div className="min-h-screen bg-[#fceef6] flex flex-col items-center justify-center gap-5">
            <div className="flex justify-center items-center gap-3">
                <button className="bg-[#ef1d8a] rounded-[10px] w-10 h-10 flex items-center justify-center">
                    <img src={iconImage} className="h-6 w-6" />
                </button>

                <span className="font-bold">RecipeHub</span>
            </div>

            <form 
                action=""
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col bg-white p-6 rounded-2xl gap-3">
                    <div className="flex flex-col items-center gap-3">
                        <span className="text-[#892d72] font-[600] text-2xl">Welcome Back</span>
                        <span className="">Sign in to explore delicious recipes</span>
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
                                className="bg-[#e60076] rounded-2xl text-white w-full p-3"
                            >
                                {loading ? "Logining..." : "Login"}
                            </button>
                        </div>
                        <div className="flex gap-3">
                            <span>Don't have an account?</span>
                            <Link to="/register" className="font-bold text-[#ec479c]">Register here</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}