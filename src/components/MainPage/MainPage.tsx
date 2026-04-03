import { useEffect, useState } from "react"
import { useDishStore } from "../../store/dishStore"

import { PlusIcon } from "@heroicons/react/24/solid"
import { UserIcon, ArrowRightEndOnRectangleIcon, MagnifyingGlassIcon, ClockIcon } from "@heroicons/react/24/outline"
import iconImage from "../../assets/icon.svg"
import { Link, useNavigate } from "react-router-dom"

export const MainPage = () => {
    const { dishes, fetchDishes, loading } = useDishStore()

    useEffect(() => {
        fetchDishes()
    }, [])

    const navigate = useNavigate()

    const getReceiptById = (id: string) => {
        navigate(`/dishes/${id}`)
    }
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#fdf2f8]">

            {/* HEADER */}
            <div className="shadow-md bg-white h-15 border-b border-pink-100 flex items-center">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">

                        <div className="flex py-5 items-center gap-2">
                            <button className="bg-[#ef1d8a] rounded-[10px] w-10 h-10 flex items-center justify-center">
                                <img src={iconImage} className="h-6 w-6" />
                            </button>
                            <div className="text-black font-[700] text-xl">
                                Recipe
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-[#c4c7cd]">
                            <div>Recipes</div>
                            <div>Experiments</div>
                        </div>

                        <div className="flex items-center gap-5">
                            <button onClick={() => setIsOpen(true)} className="flex items-center gap-2 rounded-[10px] w-32 h-9 bg-[#e6077a] text-white px-3">
                                <PlusIcon className="h-3 w-3" />
                                Add Dish
                            </button>
                            <Link to="/register">
                                <UserIcon className="h-4 w-4 text-black" />
                            </Link>
                            <ArrowRightEndOnRectangleIcon className="h-4 w-4 text-black" />
                        </div>
                    </div>
                </div>
            </div>

            {/* SEARCH */}
            <div className="px-10 py-8">
                <div className="text-3xl font-bold mb-4">
                    Dámli retseptterdi zertteńiz
                </div>

                <div className="flex items-center bg-gray-100 px-3 h-12 rounded-lg">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    <input
                        className="bg-transparent ml-2 outline-none w-full"
                        placeholder="Retseptterdi izdeńiz"
                    />
                </div>
            </div>

            {/* GRID */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-10 pb-10">

                {loading && <div>Loading...</div>}

                {dishes.map((dish) => (
                    <div key={dish.id} onClick={() => getReceiptById(dish.id)} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl cursor-pointer">

                        {/* IMAGE */}
                        <img
                            src={dish.images[0]?.image_path || "/no-image.png"}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-4">
                            <div className="text-lg font-semibold">
                                {dish.name}
                            </div>

                            {/* ⭐ РЕЙТИНГ */}
                            <div className="flex mt-2">
                                {Array.from({ length: 10 }).map((_, index) => (
                                    <span
                                        key={index}
                                        className={`text-lg ${index < Math.round(dish.value)
                                                ? "text-yellow-400"
                                                : "text-gray-300"
                                            }`}
                                    >
                                        ★
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-2 text-gray-400 mt-2">
                                <ClockIcon className="h-4 w-4" />
                                <span>-- min</span>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <div className="h-screen flex items-center justify-center bg-gray-100">
                {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
                            {/* Закрыть */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>

                            <h2 className="text-xl font-semibold mb-4">Добавить Receipt</h2>

                            {/* Пример формы */}
                            <form className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder="Название"
                                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Сумма"
                                    className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                                />

                                <div className="flex justify-end mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                                    >
                                        Отмена
                                    </button>
                                    <button
                                        type="submit"
                                        className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                                    >
                                        Сохранить
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
