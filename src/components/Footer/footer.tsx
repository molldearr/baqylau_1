export const Footer = () => {
  return (
    <div className="bg-pink-300 text-black mt-12">
      <div className="max-w-7xl mx-auto px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <div className="text-2xl font-bold mb-3">RecipeDear</div>
            <div className="text-black-400 text-sm leading-6">
              Discover delicious recipes and fun kitchen experiments.
              Learn, cook, and explore all in one place.
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold mb-3">Quick Links</div>
            <div className="flex flex-col gap-2 text-black-400 text-sm">
              <div className="hover:text-white cursor-pointer">Recipes</div>
              <div className="hover:text-white cursor-pointer">Experiments</div>
              <div className="hover:text-white cursor-pointer">About</div>
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold mb-3">Contact</div>
            <div className="flex flex-col gap-2 text-black-400 text-sm">
              <div>Email: recipedear@gmail.com</div>
              <div>Phone: +7 778 524 0585</div>
              <div>Kitchen Science & Cooking</div>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-900 mt-8 pt-4 text-center text-gray-500 text-sm">
          © 2026 RecipeDear. All rights reserved.
        </div>
      </div>
    </div>
  )
}