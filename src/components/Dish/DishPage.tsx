import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDishStore } from "../../store/dishStore"
import { ClockIcon } from "@heroicons/react/24/outline"
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, FireIcon } from "@heroicons/react/24/solid"

export const DishPage = () => {
    const { id } = useParams()
    const { currentDish, fetchDishById, loading } = useDishStore()
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (id) fetchDishById(id)
    }, [id])

    if (loading || !currentDish) return <div>Loading...</div>

    const images = currentDish.images || []

    const prevImage = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const nextImage = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    return (
        <div className="min-h-screen bg-[#fdf2f8] p-10">
            <div className="max-w-3xl mx-auto rounded-xl shadow overflow-hidden">
                <span className="font-bold text-sm flex items-center gap-1 text-[#e7007a] pb-4">
                    <ArrowLeftIcon className="h-4 w-4" />
                    Back to Recipes
                </span>
                <div className="max-w-3xl mx-auto rounded-xl shadow overflow-hidden relative">

                    {/* CAROUSEL */}
                    {images.length > 0 && (
                        <div className="relative">
                            <img
                                src={images[currentIndex].image_path}
                                className="w-full h-64 object-cover"
                                alt={`Dish ${currentIndex + 1}`}
                            />

                            {/* Left Arrow */}
                            <button
                                onClick={prevImage}
                                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition"
                            >
                                <ChevronLeftIcon className="h-5 w-5 text-gray-800" />
                            </button>

                            {/* Right Arrow */}
                            <button
                                onClick={nextImage}
                                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 hover:bg-opacity-100 transition"
                            >
                                <ChevronRightIcon className="h-5 w-5 text-gray-800" />
                            </button>

                            {/* Dots */}
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                                {images.map((_, idx) => (
                                    <span
                                        key={idx}
                                        className={`h-2 w-2 rounded-full ${idx === currentIndex ? "bg-gray-800" : "bg-gray-400"}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-2">{currentDish.name}</h1>
                        <p className="text-gray-700">{currentDish.description}</p>
                    </div>

                    <div className="px-6 flex items-center gap-3 p-4">
                        <div className="flex gap-2 text-red-700 bg-yellow-200 p-2 rounded-2xl">
                            <span>Medium</span>
                        </div>
                        <div className="flex gap-2 text-gray-400">
                            <ClockIcon className="h-5 w-5" />
                            <span>{currentDish.receipt?.cooking_time} min</span>
                        </div>
                        <div className="flex text-gray-500">
                            <FireIcon className="h-5 w-5" />
                            {currentDish.receipt?.calorie}
                        </div>
                    </div>

                    {/* <div className="">
                        {currentDish.receipt..map((_, idx) => (
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    )
}