import { useEffect, useState } from "react"
import {
  BeakerIcon,
  MagnifyingGlassIcon,
  ClockIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/24/outline"
import { useExperimentStore } from "../../store/experimentStore"

export const ExperimentsPage = () => {
  const [openId, setOpenId] = useState<string | null>(null)

  const { experiments, fetchExperiments, loading } = useExperimentStore()

  useEffect(() => {
    fetchExperiments()
  }, [])

  return (
    <div className="px-10 py-8 bg-[#fdf2f8] min-h-screen">
      <div className="flex flex-col items-center text-center mb-8">
        <div className="bg-pink-300 rounded-full w-16 h-16 flex items-center justify-center mb-4">
          <BeakerIcon className="h-8 w-8 text-white" />
        </div>

        <div className="text-3xl font-bold text-pink-300 mb-2">
          Kitchen Experiments
        </div>

        <div className="text-gray-500 max-w-xl">
          Learn science through fun and safe kitchen experiments
        </div>
        
      </div>

      <div className="flex flex-col items-center gap-6">
        {loading && <div>Loading...</div>}

        {experiments.map((experiment) => (
          <div
            key={experiment.id}
            className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl w-full max-w-4xl border border-gray-200"
          >
            <div className="p-6">
              <div className="text-2xl font-bold text-black mb-3">
                {experiment.name}
              </div>

              <div className="text-gray-600 text-lg mb-6">
                {experiment.description}
              </div>

              <div className="flex items-center gap-3 flex-wrap mb-5">
                <div className="border border-gray-300 text-black text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                  <ClockIcon className="h-4 w-4" />
                  <span>{experiment.cooking_time} min</span>
                </div>
              </div>

              <button
                onClick={() =>
                  setOpenId(openId === experiment.id ? null : experiment.id)
                }
                className="border border-gray-300 px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-gray-50"
              >
                {openId === experiment.id ? "Hide Details" : "View Details"}

                {openId === experiment.id ? (
                  <ChevronUpIcon className="h-4 w-4" />
                ) : (
                  <ChevronDownIcon className="h-4 w-4" />
                )}
              </button>
            </div>

            {openId === experiment.id && (
              <div className="border-t border-gray-200 bg-[#fafafa] p-6">
                <div className="text-lg font-semibold mb-3 text-pink-600">
                  Step-by-Step Instructions
                </div>

                <div className="flex flex-col gap-2 mb-5">
                  <div>1. Prepare ingredients</div>
                  <div>2. Start experiment</div>
                  <div>3. Observe result</div>
                </div>

                <div className="text-lg font-semibold mb-2">
                  Expected Result
                </div>

                <div className="bg-gray-100 rounded-xl p-4 border-l-4 border-pink-400">
                  <div className="text-gray-700">
                    {experiment.result}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}