import { useEffect, useState } from "react"
import {
    MagnifyingGlassIcon,
    ClockIcon,
    BeakerIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    PlusIcon
} from "@heroicons/react/24/outline"
import { useExperimentStore } from "../../store/experimentStore"
import { AddExperimentModal } from "./AddExperimentModal"

const difficultyColor = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700"
}

export const ExperimentsPage = () => {
    const {
        experiments,
        suggestions,
        loading,
        fetchExperiments,
        searchExperiment,
        searchExperimentAutocomplete,
        clearSuggestions
    } = useExperimentStore()

    const [query, setQuery] = useState("")
    const [expandedId, setExpandedId] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetchExperiments()
    }, [fetchExperiments])

    useEffect(() => {
        const delay = setTimeout(() => {
            if (query.trim()) {
                searchExperimentAutocomplete(query)
            } else {
                clearSuggestions()
                fetchExperiments()
            }
        }, 300)

        return () => clearTimeout(delay)
    }, [query])

    const handleSelect = async (title: string) => {
        setQuery(title)
        clearSuggestions()
        await searchExperiment(title)
    }

    const toggleExpand = (id: string) => {
        setExpandedId((prev) => (prev === id ? null : id))
    }

    return (
        <div className="min-h-screen bg-[#fcfcfd]">
            <div className="flex flex-col items-center justify-center text-center py-14 px-4">
                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-4">
                    <BeakerIcon className="h-8 w-8 text-[#ef1d8a]" />
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    Kitchen Science Experiments
                </h1>

                <p className="text-gray-500 text-center max-w-lg">
                    Learn science through fun and safe kitchen experiments. Perfect for students and curious minds!
                </p>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-6 flex items-center gap-2 bg-[#ef1d8a] text-white px-5 py-3 rounded-xl font-medium hover:bg-[#d31979] transition cursor-pointer"
                >
                    <PlusIcon className="h-5 w-5" />
                    Add Experiment
                </button>
            </div>

            <div className="px-10 pb-6 relative max-w-4xl mx-auto">
                <div className="flex items-center bg-gray-100 px-3 h-12 rounded-lg">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    <input
                        value={query}
                        className="bg-transparent ml-2 outline-none w-full"
                        placeholder="Search experiments..."
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                {suggestions.length > 0 && (
                    <div className="absolute bg-white shadow-md w-full mt-2 rounded-lg z-50">
                        {suggestions.map((exp) => (
                            <div
                                key={exp.id}
                                onClick={() => handleSelect(exp.title)}
                                className="p-3 hover:bg-gray-100 cursor-pointer"
                            >
                                {exp.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-4 px-10 pb-10 max-w-4xl mx-auto">

                {loading && <div>Loading...</div>}

                {experiments.map((exp) => (
                    <div
                        key={exp.id}
                        className="bg-white rounded-xl shadow overflow-hidden"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-bold">{exp.title}</h2>
                            <p className="text-gray-500 mt-1">{exp.description}</p>

                            <div className="flex items-center gap-3 mt-4">
                                <span className={`text-sm px-3 py-1 rounded-full font-medium ${difficultyColor[exp.difficulty]}`}>
                                    {exp.difficulty}
                                </span>

                                <span className="flex items-center gap-1 text-sm text-[#892d72] border border-pink-200 bg-pink-50 px-3 py-1 rounded-full">
                                    <BeakerIcon className="h-4 w-4" />
                                    {exp.category}
                                </span>

                                <span className="flex items-center gap-1 text-sm text-gray-500">
                                    <ClockIcon className="h-4 w-4" />
                                    {exp.duration_minutes} min
                                </span>
                            </div>

                            <button
                                onClick={() => toggleExpand(exp.id)}
                                className="mt-4 flex items-center gap-2 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 cursor-pointer"
                            >
                                {expandedId === exp.id ? (
                                    <>Hide Details <ChevronUpIcon className="h-4 w-4" /></>
                                ) : (
                                    <>View Details <ChevronDownIcon className="h-4 w-4" /></>
                                )}
                            </button>
                        </div>

                        {expandedId === exp.id && (
                            <div className="border-t border-gray-100 p-6 space-y-6">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="bg-pink-100 text-[#892d72] rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">
                                            1
                                        </div>
                                        <h3 className="text-lg font-semibold text-[#892d72]">Step-by-Step Instructions</h3>
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        {exp.steps.map((step, index) => (
                                            <div key={step.id} className="flex items-start gap-3">
                                                <div className="bg-[#ef1d8a] text-white rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold flex-shrink-0">
                                                    {index + 1}
                                                </div>
                                                <span className="text-gray-700 pt-0.5">{step.instruction}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="bg-green-100 text-green-600 rounded-full w-7 h-7 flex items-center justify-center text-sm font-bold">
                                            ✓
                                        </div>
                                        <h3 className="text-lg font-semibold">Expected Result</h3>
                                    </div>

                                    <div className="border-l-4 border-green-400 pl-4">
                                        <p className="text-gray-700 leading-relaxed">{exp.expected_result}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isModalOpen && (
                <AddExperimentModal onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    )
}