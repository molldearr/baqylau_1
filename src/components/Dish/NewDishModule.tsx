import React, { useState } from "react";

export default function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
            {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            {/* Закрыть */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">Добавить Receipt</h2>

            {/* Пример формы */}
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Название"
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="number"
                placeholder="Сумма"
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}