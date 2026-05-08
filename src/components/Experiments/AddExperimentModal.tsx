import { useState } from "react"
import { XMarkIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useExperimentStore } from "../../store/experimentStore"
import type { ExperimentCreate } from "../../api/experimentApi"

interface Props {
    onClose: () => void
}

export const AddExperimentModal = ({ onClose }: Props) => {
    const { createExperiment, loading, experimentCreated, fetchExperiments } = useExperimentStore()

    const [form, setForm] = useState<Omit<ExperimentCreate, "steps">>({
        title: "",
        description: "",
        difficulty: "Easy",
        category: "",
        duration_minutes: 0,
        expected_result: "",
    })

    const [steps, setSteps] = useState<string[]>([""])

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleStepChange = (index: number, value: string) => {
        const updated = [...steps]
        updated[index] = value
        setSteps(updated)
    }

    const addStep = () => {
        setSteps([...steps, ""])
    }

    const removeStep = (index: number) => {
        setSteps(steps.filter((_, i) => i !== index))
    }

    const handleSubmit = async () => {
    await createExperiment({ ...form, steps })

    await fetchExperiments() // всегда обновляем список
    onClose()
}

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>

                <div className="text-xl font-semibold mb-5 text-[#892d72]">
                    Add Experiment
                </div>

                <div className="flex flex-col gap-4">

                    <div className="flex flex-col gap-1">
                        <div className="font-bold text-sm">Title</div>
                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            className="bg-[#f3f3f5] rounded-xl p-3 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="font-bold text-sm">Description</div>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className="bg-[#f3f3f5] rounded-xl p-3 outline-none"
                        />
                    </div>

                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1 flex-1">
                            <div className="font-bold text-sm">Difficulty</div>
                            <select
                                name="difficulty"
                                value={form.difficulty}
                                onChange={handleChange}
                                className="bg-[#f3f3f5] rounded-xl p-3 outline-none"
                            >
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <div className="flex flex-col gap-1 flex-1">
                            <div className="font-bold text-sm">Time</div>
                            <input
                                type="number"
                                name="duration_minutes"
                                value={form.duration_minutes}
                                onChange={handleChange}
                                className="bg-[#f3f3f5] rounded-xl p-3 outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="font-bold text-sm">Category</div>
                        <input
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="bg-[#f3f3f5] rounded-xl p-3 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="font-bold text-sm">Steps</div>

                        {steps.map((step, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    value={step}
                                    onChange={(e) => handleStepChange(index, e.target.value)}
                                    className="bg-[#f3f3f5] rounded-xl p-3 flex-1 outline-none"
                                />
                                {steps.length > 1 && (
                                    <button
                                        onClick={() => removeStep(index)}
                                        className="p-3 bg-red-100 rounded-xl"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        ))}

                        <button
                            onClick={addStep}
                            className="flex items-center gap-2 text-[#892d72]"
                        >
                            <PlusIcon className="h-4 w-4" />
                            Add Step
                        </button>
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="font-bold text-sm">Result</div>
                        <textarea
                            name="expected_result"
                            value={form.expected_result}
                            onChange={handleChange}
                            className="bg-[#f3f3f5] rounded-xl p-3 outline-none"
                        />
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="bg-[#892d72] text-white rounded-xl p-3"
                    >
                        {loading ? "Creating..." : "Create Experiment"}
                    </button>

                </div>
            </div>
        </div>
    )
}