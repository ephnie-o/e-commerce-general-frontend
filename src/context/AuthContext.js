import api from "@/api";
import {jwtDecode} from "jwt-decode"

import {createContext, useState, useEffect} from "react";


export const AuthContext = createContext(false)

export function AuthProvider({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState("")
    // const [userEmail, setUserEmail] = useState("")

    const handleAuth = () => {
        const token = localStorage.getItem("access")
        if(token){
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now() / 1000
            if (expiry_date >= current_time) {
                setIsAuthenticated(true)
            }
        }
    }

    function get_username() {
        api.get("get_username")
        .then(res => {
            setUsername(res.data.username)
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    useEffect(() => {
      handleAuth()
      get_username()

    }, [])

    // function get_userEmail() {
    //     api.get("get_user_email")
    //     .then(res => {
    //         setUserEmail(res.data.email)
    //     })
    //     .catch(err => {
    //         console.log(err.message)
    //     })
    // }

    // useEffect(() => {
    //   handleAuth()
    //   get_userEmail()

    // }, [])

    const authValue = {isAuthenticated, username, setIsAuthenticated, get_username}

    return <AuthContext.Provider value={authValue}>
        {children}
    </AuthContext.Provider>
}