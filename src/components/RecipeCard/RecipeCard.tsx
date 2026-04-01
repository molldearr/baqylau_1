import { ClockIcon } from "@heroicons/react/24/outline"

type RecipeCardProps = {
  image: string
  title: string
}

export const RecipeCard = ({ image, title }: RecipeCardProps) => {
  return (
    <div className="w-73 h-90 bg-white flex flex-col items-center cursor-pointer justify-start rounded-xl hover:shadow-xl overflow-hidden">
      <img src={image} className="w-full transition hover:scale-105 object-cover" />
      <div className="text-black font-[500] py-9 text-xl font-serif">{title}</div>
      <ClockIcon className="h-5.5 w-5.5" />
    </div>
  )
}