import { useState } from "react"
import iconImage from "../../assets/icon.svg"
import { PlusIcon } from "@heroicons/react/24/solid"
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline"
import { useAuthStore } from "../../store/authStore"
import { useNavigate, useLocation } from "react-router-dom"
import { AddDishModal } from "../Dish/AddDishModal"
import { AddExperimentModal } from "../Experiments/AddExperimentModal"

export const Navbar = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { token, logout } = useAuthStore()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const isRecipes = location.pathname === "/"
    const isExperiments = location.pathname === "/experiments"

    const onLoginClick = () => {
        navigate("/login")
    }

    const onLogoutClick = () => {
        logout()
        navigate("/login")
    }

    return (
        <>
            <header className="bg-white shadow-sm sticky top-0 z-[999]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* LOGO */}
                        <div
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <div className="bg-pink-400 rounded-xl w-10 h-10 flex items-center justify-center">
                              <img src={iconImage} className="w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold text-black">
                                Recipe&Dear
                            </span>
                        </div>

                        {/* NAV */}
                        <nav className="hidden md:flex items-center gap-6">
                            <button
                                onClick={() => navigate("/")}
                                className={`font-medium transition ${
                                    isRecipes
                                        ? "text-pink-400"
                                        : "text-gray-700 hover:text-pink-400"
                                }`}
                            >
                                Recipes
                            </button>

                            <button
                                onClick={() => navigate("/experiments")}
                                className={`font-medium transition ${
                                    isExperiments
                                        ? "text-pink-400"
                                        : "text-gray-700 hover:text-pink-400"
                                }`}
                            >
                                Experiments
                            </button>
                        </nav>

                        {/* ACTIONS (твой стиль сохранён) */}
                        <div className="flex items-center gap-4">

                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-400 text-white font-medium"
                            >
                                <PlusIcon className="w-5 h-5" />
                                {isExperiments ? "Add Experiment" : "Add Recipe"}
                            </button>

                            {/* 👇 ВОТ ЭТО МЫ ДОБАВИЛИ */}
                            {token ? (
                                <button
                                    onClick={onLogoutClick}
                                    className="text-gray-700 hover:text-red-400 font-medium"
                                >
                                    Logout
                                </button>
                            ) : (
                                <button
                                    onClick={onLoginClick}
                                    className="text-gray-700 hover:text-indigo-600 font-medium"
                                >
                                    Login
                                </button>
                            )}

                        </div>

                    </div>
                </div>
            </header>

            {isModalOpen && isExperiments && (
                <AddExperimentModal onClose={() => setIsModalOpen(false)} />
            )}

            {isModalOpen && !isExperiments && (
                <AddDishModal onClose={() => setIsModalOpen(false)} />
            )}
        </>
    )
}