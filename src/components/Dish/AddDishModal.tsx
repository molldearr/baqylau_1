import { useState } from "react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { useDishStore } from "../../store/dishStore"

interface Props {
    onClose: () => void
}

export const AddDishModal = ({ onClose }: Props) => {
    const { createDish, loading } = useDishStore()

    const [form, setForm] = useState({
        name: "",
        description: "",
        cooking_time: "",
        calorie: "",
        difficulty: "",
        category: "",
        ingredients: "",
        instructions: "",
    })

    const [image, setImage] = useState<File | null>(null)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleSubmit = async () => {
        if (!form.name.trim()) {
            alert("Введите название рецепта")
            return
        }

        if (!form.description.trim()) {
            alert("Введите описание")
            return
        }

        const data = new FormData()

        data.append("name", form.name)
        data.append("description", form.description)
        data.append("cooking_time", form.cooking_time)
        data.append("calorie", form.calorie)
        data.append("ingredients", form.ingredients)
        data.append("instructions", form.instructions)

        // если понадобится потом
        if (form.difficulty) data.append("difficulty", form.difficulty)
        if (form.category) data.append("category", form.category)

        if (image) {
            data.append("image", image)
        }

        await createDish(data)
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6 relative max-h-[90vh] overflow-y-auto">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>

                <h2 className="text-2xl font-bold text-[#9b0056] mb-4">
                    Add New Recipe
                </h2>

                <div className="flex flex-col gap-4">

                    {/* IMAGE UPLOAD */}
                    <div>
                        
                        <div>
                            <div className="font-bold text-sm text-[#9b0056] mb-2">
                                Recipe Image
                            </div>

                            <label className="cursor-pointer block">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />

                                <div className="w-full h-48 bg-gray-100 border-2 border-dashed border-pink-300 rounded-xl flex items-center justify-center overflow-hidden hover:bg-gray-200 transition">
                                    
                                    {!image ? (
                                        <span className="text-gray-400 text-sm">
                                            Click to upload image
                                        </span>
                                    ) : (
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="preview"
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                </div>
                            </label>
                        </div>

                        {image && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                className="mt-3 w-full h-40 object-cover rounded-lg"
                            />
                        )}
                    </div>

                    <div>
                        <div className="font-bold text-sm text-[#9b0056]">
                            Recipe Name *
                        </div>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="mt-2 w-full bg-gray-100 border border-pink-200 rounded-lg p-3 outline-none"
                        />
                    </div>

                    <div>
                        <div className="font-bold text-sm text-[#9b0056]">
                            Description *
                        </div>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={3}
                            className="mt-2 w-full bg-gray-100 border border-pink-200 rounded-lg p-3 outline-none resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <div className="font-bold text-sm text-[#9b0056]">
                                Cooking Time *
                            </div>
                            <input
                                name="cooking_time"
                                value={form.cooking_time}
                                onChange={handleChange}
                                placeholder="30"
                                className="mt-2 w-full bg-gray-100 border border-pink-200 rounded-lg p-3 outline-none"
                            />
                        </div>

                        <div>
                            <div className="font-bold text-sm text-[#9b0056]">
                                Calories *
                            </div>
                            <input
                                name="calorie"
                                value={form.calorie}
                                onChange={handleChange}
                                placeholder="250"
                                className="mt-2 w-full bg-gray-100 border border-pink-200 rounded-lg p-3 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="font-bold text-sm text-[#9b0056]">
                            Difficulty *
                        </div>
                        <select
                            name="difficulty"
                            value={form.difficulty}
                            onChange={handleChange}
                            className="mt-2 w-full bg-gray-100 border border-pink-200 rounded-lg p-3 outline-none"
                        >
                            <option value="">Select difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </div>

                    <div>
                        <div className="font-bold text-sm text-[#9b0056]">
                            Category *
                        </div>
                        <input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="mt-2 w-full bg-gray-100 border border-pink-200 rounded-lg p-3 outline-none"
                        />
                    </div>

                    <div>
                        <div className="font-bold text-sm text-[#9b0056]">
                            Ingredients *
                        </div>
                        <textarea
                            name="ingredients"
                            value={form.ingredients}
                            onChange={handleChange}
                            placeholder={"Ұн - 200g\nҚант - 100g"}
                            rows={5}
                            className="mt-2 w-full bg-gray-100 border border-pink-200 rounded-lg p-3 outline-none resize-none"
                        />
                    </div>

                    <div>
                        <div className="font-bold text-sm text-[#9b0056]">
                            Instructions *
                        </div>
                        <textarea
                            name="instructions"
                            value={form.instructions}
                            onChange={handleChange}
                            rows={5}
                            className="mt-2 w-full bg-gray-100 border border-pink-200 rounded-lg p-3 outline-none resize-none"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-[#e6077a] text-white rounded-xl p-3 font-medium cursor-pointer hover:bg-[#c90065] disabled:opacity-60"
                    >
                        {loading ? "Creating..." : "Create Recipe"}
                    </button>
                </div>
            </div>
        </div>
    )
}