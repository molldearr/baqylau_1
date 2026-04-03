import axios from "axios"

export const apiClient = axios.create({
    baseURL: "http://localhost:8000", // 🔥 поменяй на свой backend
    headers: {
        "Content-Type": "application/json"
    }
})

// Клиент с токеном из localStorage
export const apiClientWithAuth = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
        "Content-Type": "application/json"
    }
})

// Интерцептор, который добавляет Authorization к каждому запросу
apiClientWithAuth.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token")
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)