import { useEffect } from "react"
import { useDishStore } from "../store/dishStore"

import { PlusIcon } from "@heroicons/react/24/solid"
import { UserIcon, ArrowRightEndOnRectangleIcon, MagnifyingGlassIcon, ClockIcon } from "@heroicons/react/24/outline"
import iconImage from "../assets/icon.svg"
import { Link } from "react-router-dom"

export const MainPage = () => {
    const { dishes, fetchDishes, loading } = useDishStore()

    useEffect(() => {
        fetchDishes()
    }, [])

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
                            <button className="flex items-center gap-2 rounded-[10px] w-32 h-9 bg-[#e6077a] text-white px-3">
                                <PlusIcon className="h-3 w-3" />
                                Add Recipe
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
                    <div key={dish.id} className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl cursor-pointer">

                        {/* IMAGE */}
                        <img
                            src={dish.images[0]?.image_path || "/no-image.png"}
                            className="w-full h-48 object-cover"
                        />

                        <div className="p-4">
                            <div className="text-lg font-semibold">
                                {dish.name}
                            </div>

                            <div className="flex items-center gap-2 text-gray-400 mt-2">
                                <ClockIcon className="h-4 w-4" />
                                <span>-- min</span>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
}