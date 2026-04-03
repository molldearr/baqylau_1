import { useState } from "react"
import { UserCRUD } from "./User/list/UserList"
import { useAdminStore } from "../../store/adminStore"

interface SidebarItem {
    name: string
    key: string
}

export const AdminDashboard = () => {
    const sidebarItems: SidebarItem[] = [
        { name: "Users", key: "users" },
        { name: "Dishes", key: "dishes" },
        { name: "Receipts", key: "receipts" },
        { name: "Ratings", key: "ratings" },
        { name: "Kitchens", key: "kitchens" },
        { name: "Difficulties", key: "difficulties" },
    ]

    const logout = useAdminStore((state) => state.logout)
    const userLogined = useAdminStore((state) => state.userLogined)

    const logoutClick = () => {
        logout()
        // после логаута можно редиректить на страницу логина
        window.location.href = "/admin_login"
    }

    const [selectedItem, setSelectedItem] = useState<string | null>(null)

    const adminName = "Admin Name"
    const adminAvatar = "https://i.pravatar.cc/40"

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="flex flex-col w-64 bg-white shadow-md">
                <div className="h-20 flex items-center justify-center border-b border-gray-200">
                    <span className="font-bold text-xl">EMBLEM</span>
                </div>
                <div className="flex-1 overflow-y-auto mt-4">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.key}
                            className={`w-full text-left px-6 py-3 hover:bg-gray-100 transition ${
                                selectedItem === item.key ? "bg-gray-200 font-semibold" : "text-gray-700"
                            }`}
                            onClick={() => setSelectedItem(item.key)}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>
                <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center gap-3 mb-3">
                        <img src={adminAvatar} alt="Admin Avatar" className="w-10 h-10 rounded-full" />
                        <span className="font-semibold text-gray-800">{adminName}</span>
                    </div>
                    <button onClick={logoutClick} className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                        Logout
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 p-6">
                {selectedItem === "users" ? (
                    <UserCRUD />
                ) : selectedItem ? (
                    <div className="bg-white rounded-xl shadow p-6">
                        <h2 className="text-xl font-semibold mb-4">{selectedItem}</h2>
                        <p>CRUD operations will appear here...</p>
                    </div>
                ) : (
                    <div className="h-full w-full bg-gray-300 rounded-xl" />
                )}
            </div>
        </div>
    )
}