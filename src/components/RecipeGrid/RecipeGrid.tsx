import { RecipeCard } from "../RecipeCard/RecipeCard"

import foodImage from "../../assets/food.jpg"
import SaladImage from "../../assets/Salad.jpg"
import SteakImage from "../../assets/steak.jpg"
import PunImage from "../../assets/pun.jpg"
import PizzaImage from "../../assets/pizza.jpg"
import SushiImage from "../../assets/sushi.jpg"
import BurgerImage from "../../assets/burg.jpg"
import CakeImage from "../../assets/cake.jpg"

const recipes = [
  { image: foodImage, title: "Classic Pasta Carbonara" },
  { image: SaladImage, title: "Fresh Garden Salad" },
  { image: SteakImage, title: "Grilled Ribeye Steak" },
  { image: PunImage, title: "Fluffy Pancakes" },
  { image: PizzaImage, title: "Pizza" },
  { image: SushiImage, title: "Sushi Rolls" },
  { image: BurgerImage, title: "Classic Burger & Fries" },
  { image: CakeImage, title: "Chocolate Lava Cake" },
]

export const RecipeGrid = () => {
  return (
    <div className="grid grid-cols-4 grid-rows-3 py-7 px-35 gap-4">
      {recipes.map((r) => (
        <RecipeCard key={r.title} image={r.image} title={r.title} />
      ))}
    </div>
  )
}