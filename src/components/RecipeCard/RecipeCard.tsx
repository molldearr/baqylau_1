import { ClockIcon } from "@heroicons/react/24/outline"

type RecipeCardProps = {
  image: string
  title: string
  cookingTime?: number
  difficulty?: string
}

const difficultyStyle: Record<string, string> = {
  "easy": "bg-green-500",
  "medium": "bg-yellow-400",
  "hard": "bg-red-500",
}

export const RecipeCard = ({ image, title, cookingTime, difficulty }: RecipeCardProps) => {
  return (
    <div className="w-73 h-90 bg-white flex flex-col items-center cursor-pointer justify-start rounded-xl hover:shadow-xl overflow-hidden relative">
      
      {difficulty && (
        <span className={`absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full ${difficultyStyle[difficulty] ?? "bg-gray-500"}`}>
          {difficulty}
        </span>
      )}

      <img src={image} className="w-full transition hover:scale-105 object-cover" />
      <div className="text-black font-[500] py-4 text-xl font-serif">{title}</div>
      <div className="flex items-center gap-1 mt-2 text-gray-500 text-sm">
        <ClockIcon className="h-4 w-4" />
        <span>{cookingTime ?? "--"} мин</span>
      </div>
    </div>
  )
}