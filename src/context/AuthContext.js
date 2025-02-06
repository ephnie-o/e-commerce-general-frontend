import api from "@/api";
import {jwtDecode} from "jwt-decode"

import {createContext, useState, useEffect} from "react";


export const AuthContext = createContext(false)

export function AuthProvider({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    const handleAuth = () => {
        const token = localStorage.getItem("access")
        if(token){
            try {
                const decoded = jwtDecode(token)
                const expiry_date = decoded.exp
                const current_time = Date.now() / 1000
                if (expiry_date >= current_time) {
                    setIsAuthenticated(true)
                }
            } catch (error) {
                console.log("Error decoding token:", error.message);
            }
        }
    }

    function get_username() {
        api.get("user/username/")
        .then(res => {
            setUsername(res.data.username)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    function get_email() {
        api.get("user/email/")
        .then(res => {
            setEmail(res.data.email)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    useEffect(() => {
      handleAuth()
      get_username()
      get_email()
    }, [])


    const authValue = {isAuthenticated, username, setIsAuthenticated, get_username, email, get_email}

    return <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
}