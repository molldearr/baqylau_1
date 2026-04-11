import { useEffect, useState } from "react"
import { useDishStore } from "../../store/dishStore"
import {
    MagnifyingGlassIcon,
    ClockIcon
} from "@heroicons/react/24/outline"

import { useNavigate } from "react-router-dom"

export const MainPage = () => {
    const {
        dishes,
        suggestions,
        fetchDishes,
        searchDishAutocomplete,
        clearSuggestions,
        loading,
        searchDish
    } = useDishStore()

    const [query, setQuery] = useState("")

    const navigate = useNavigate()

    // useEffect(() => {
    //     fetchDishes()
    // }, [])

    const handleSelect = (word: string) => {
        searchDish(word)
        clearSuggestions()
    }

    useEffect(() => {
        const timeout = setTimeout(() => {

            // 🧠 если пустой input → вернуть все блюда
            if (query.trim().length === 0) {
                fetchDishes()
                clearSuggestions()
                return
            }

            searchDishAutocomplete(query)
        }, 300)

        return () => clearTimeout(timeout)
    }, [query])

    return (
        <div className="min-h-screen bg-[#fdf2f8]">

            {/* SEARCH */}
            <div className="px-10 py-8 relative">
                <div className="text-3xl font-bold mb-4">
                    Dámli retseptterdi zertteńiz
                </div>

                <div className="flex items-center bg-gray-100 px-3 h-12 rounded-lg">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />

                    <input
                        value={query}
                        className="bg-transparent ml-2 outline-none w-full"
                        placeholder="Retseptterdi izdeńiz"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {/* 🔥 AUTOCOMPLETE DROPDOWN */}
                {suggestions.length > 0 && (
                    <div className="absolute bg-white shadow-md w-full mt-2 rounded-lg z-50">
                        {suggestions.map((dish) => (
                            <div
                                key={dish.id}
                                onClick={() => handleSelect(dish.name)}
                                className="p-3 hover:bg-gray-100 cursor-pointer"
                            >
                                {dish.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* GRID */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-10 pb-10">

                {loading && <div>Loading...</div>}

                {dishes.map((dish) => (
                    <div
                        key={dish.id}
                        onClick={() => navigate(`/dishes/${dish.id}`)}
                        className="bg-white rounded-xl overflow-hidden shadow hover:shadow-xl cursor-pointer"
                    >
                        <img
                            src={dish.images?.[0]?.image_path || "/no-image.png"}
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