import axios from "axios";
import { jwtDecode } from "jwt-decode";

// export const BASE_URL = "http://127.0.0.1:8000"

export const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

console.log("Base URL:", BASE_URL);

const api = axios.create({
    baseURL: BASE_URL
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access")
        if(token){
            try {
                const decoded = jwtDecode(token)
                const expiry_date = decoded.exp
                const current_time = Date.now() / 1000
                if(expiry_date > current_time){
                    config.headers.Authorization = `Bearer ${token}`
                } else {
                    console.log("Token has expired.");
                    localStorage.removeItem("access");
                }
            } catch (error) {
                console.log("Error decoding token:", error.message);
            }
        }
        return config;
    },
    (error) => {
        console.log("Request error:", error.message);
        return Promise.reject(error)
    }
)

export default api