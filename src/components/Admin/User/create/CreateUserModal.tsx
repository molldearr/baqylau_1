import { useEffect, useState } from "react"
import { useRoleStore } from "../../../../store/roleStore"

interface UserModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (user: { first_name: string; last_name: string; email: string; role: string }) => void
}

export const UserModal = ({ isOpen, onClose, onSubmit }: UserModalProps) => {
    const { roles, loading, getAllRoles } = useRoleStore()
    
    const [form, setForm] = useState({ first_name: "", last_name: "", email: "", role: "user" })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(form)
        setForm({ first_name: "", last_name: "", email: "", role: "user" })
        onClose()
    }

    useEffect(() => {
        getAllRoles()
    }, [])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-gray-400 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-96 p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>
                <h2 className="text-xl font-semibold mb-4">Add User</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={form.first_name}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={form.last_name}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        required
                    />
                    <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="border rounded p-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                        {roles?.map((role) => (
                            <option value={role.id}>{role.name}</option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Add
                    </button>
                </form>
            </div>
        </div>
    )
}
