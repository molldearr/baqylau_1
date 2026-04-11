import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, FireIcon } from "@heroicons/react/24/outline"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDishStore } from "../../store/dishStore"

export const DishPage = () => {
    const { id } = useParams()
    const { currentDish, fetchDishById, loading } = useDishStore()
    const [currentIndex, setCurrentIndex] = useState(0)

    const navigate = useNavigate()

    useEffect(() => {
        if (id) fetchDishById(id)
    }, [id])

    useEffect(() => {
        // 🔥 запрашиваем разрешение
        if (Notification.permission !== "granted") {
            Notification.requestPermission()
        }

        const ws = new WebSocket("ws://localhost:8000/ws/notifications")

        ws.onopen = () => {
            console.log("WebSocket connected")
        }

        ws.onmessage = (event) => {
            console.log("Notification:", event.data)

            // 🔥 браузерное уведомление
            if (Notification.permission === "granted") {
                new Notification("Baqylau API", {
                    body: event.data,
                    icon: "/vite.svg" // можешь заменить
                })
            }
        }

        ws.onclose = () => {
            console.log("WebSocket closed")
        }

        return () => ws.close()
    }, [])

    if (loading || !currentDish) return <div>Loading...</div>

    const images = currentDish.images || []
    const receipt = currentDish.receipt

    const backToRecipes = () => {
        navigate('/')
    }

    return (
        <div className="min-h-screen bg-[#fdf2f8] p-10">

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow overflow-hidden">

                {/* BACK */}
                <div className="p-4 border-b">
                    <span onClick={backToRecipes} className="font-bold text-sm flex items-center gap-1 text-[#e7007a] cursor-pointer">
                        <ArrowLeftIcon className="h-4 w-4" />
                        Back to Recipes
                    </span>
                </div>

                {/* IMAGE CAROUSEL */}
                {images.length > 0 && (
                    <div className="relative">
                        <img
                            src={images[currentIndex].image_path}
                            className="w-full h-72 object-cover"
                        />

                        <button onClick={() =>
                            setCurrentIndex(prev =>
                                prev === 0 ? images.length - 1 : prev - 1
                            )
                        } className="absolute left-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
                            <ChevronLeftIcon className="h-5 w-5" />
                        </button>

                        <button onClick={() =>
                            setCurrentIndex(prev =>
                                prev === images.length - 1 ? 0 : prev + 1
                            )
                        } className="absolute right-2 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
                            <ChevronRightIcon className="h-5 w-5" />
                        </button>
                    </div>
                )}

                {/* CONTENT */}
                <div className="p-6 space-y-6">

                    {/* TITLE */}
                    <div>
                        <h1 className="text-3xl font-bold">{currentDish.name}</h1>
                        <p className="text-gray-600 mt-2">
                            {currentDish.description}
                        </p>
                    </div>

                    {/* KITCHEN */}
                    <div className="inline-block bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                        🍽 {currentDish.kitchen?.title}
                    </div>

                    {/* RECEIPT INFO */}
                    <div className="flex items-center gap-6 text-gray-600">

                        <div className="flex items-center gap-2">
                            <ClockIcon className="h-5 w-5" />
                            <span>{receipt?.cooking_time} min</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <FireIcon className="h-5 w-5 text-red-500" />
                            <span>{receipt?.calorie} kcal</span>
                        </div>

                        <div className="bg-yellow-200 px-3 py-1 rounded-xl text-sm">
                            {currentDish.difficulty?.name}
                        </div>
                    </div>

                    {/* INGREDIENTS */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Ingredients
                        </h2>

                        <div className="grid grid-cols-2 gap-2">
                            {receipt?.receipt_ingredients?.map((item: any) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between bg-gray-100 p-2 rounded"
                                >
                                    <span>{item.ingredient.title}</span>
                                    <span className="text-gray-500">
                                        {item.quantity}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* INSTRUCTIONS */}
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Instructions
                        </h2>

                        <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                            {receipt?.instructions}
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}