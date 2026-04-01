import { PlusIcon } from "@heroicons/react/24/solid"
import { UserIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline"
import iconImage from "../../assets/icon.svg"

export const Navbar = () => {
  return (
    <div className="shadow-md bg-white h-15 border-b border-pink-100 flex items-center">
      <div className="container mx-auto px-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex py-5 items-center gap-2">
            <button className="bg-[#ef1d8a] rounded-[10px] w-10 h-10 flex items-center justify-center">
              <img src={iconImage} className="h-6.5 w-6.5" />
            </button>
            <div className="text-black font-[700] text-xl">Recipe</div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-[#c4c7cd] cursor-pointer font-[400]">Recipes</div>
            <div className="text-[#c4c7cd] cursor-pointer font-[400]">Experiments</div>
          </div>
          <div className="flex items-center gap-5">
            <button className="flex items-center gap-2 rounded-[10px] w-32 h-9 bg-[#e6077a] text-white font-[500] px-3">
              <PlusIcon className="h-3 w-3" />
              Add Recipe
            </button>
            <UserIcon className="h-4 w-4 text-black" />
            <ArrowRightEndOnRectangleIcon className="h-4 w-4 text-black" />
          </div>
        </div>
      </div>
    </div>
  )
}