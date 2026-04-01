import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDishStore } from "../../store/dish_store"
import { ClockIcon } from "@heroicons/react/24/outline"

export const DishPage = () => {
    const { id } = useParams()
    const { currentDish, fetchDishById, loading } = useDishStore()

    useEffect(() => {
        if (id) fetchDishById(id)
    }, [id])

    if (loading || !currentDish) return <div>Loading...</div>

    return (
        <div className="min-h-screen bg-[#fdf2f8] p-10">
            <div className="max-w-3xl mx-auto bg-white rounded-xl shadow overflow-hidden">
                
                {/* IMAGE */}
                {currentDish.images.length > 0 && (
                    <img
                        src={currentDish.images[0].image_path}
                        className="w-full h-64 object-cover"
                    />
                )}

                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-2">{currentDish.name}</h1>
                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                        <ClockIcon className="h-5 w-5" />
                        <span>-- min</span>
                    </div>

                    <p className="text-gray-700">{currentDish.description}</p>

                    {/* Картинки, если их несколько */}
                    {currentDish.images.length > 1 && (
                        <div className="flex gap-2 mt-4 overflow-x-auto">
                            {currentDish.images.slice(1).map((img) => (
                                <img
                                    key={img.id}
                                    src={img.image_path}
                                    className="h-24 w-24 object-cover rounded-lg"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
