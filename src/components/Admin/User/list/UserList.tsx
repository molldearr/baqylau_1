import { useEffect, useState } from "react"
import { useAdminStore } from "../../../../store/adminStore"
import { UserModal } from "../create/CreateUserModal"

export const UserCRUD = () => {
    const { users, loading, fetchUsers, addUser, deleteUser } = useAdminStore()
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [])

    if (loading) return <p>Loading users...</p>

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Users</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Add User
                </button>
            </div>

            {users.length === 0 ? (
                <p className="text-gray-500">No users available.</p>
            ) : (
                <table className="w-full table-auto border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2 text-left">Name</th>
                            <th className="border px-4 py-2 text-left">Email</th>
                            <th className="border px-4 py-2 text-left">Role</th>
                            <th className="border px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="border px-4 py-2">{user.first_name} {user.last_name}</td>
                                <td className="border px-4 py-2">{user.email}</td>
                                <td className="border px-4 py-2">{user.role?.name ?? "—"}</td>
                                <td className="border px-4 py-2 flex gap-2">
                                    <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <UserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={addUser}
            />
        </div>
    )
}