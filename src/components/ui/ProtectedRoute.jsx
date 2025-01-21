"use client"

import api from '@/api'
import {jwtDecode} from 'jwt-decode'
import React from 'react'
import { useState, useEffect } from 'react'
import Spinner from './Spinner'
import { usePathname, useRouter } from 'next/navigation'

const ProtectedRoute = ({children}) => {

    const [isAuthorized, setIsAuthorized] = useState(null)
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        async function auth() {
            const token = localStorage.getItem("access")
            if(!token){
                setIsAuthorized(false)
                return;
            }

            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now() / 1000

            if(current_time > expiry_date){
                await refreshToken()
            }
            else {
                setIsAuthorized(true)
            }
        }

        async function refreshToken() {
            const refreshToken = localStorage.getItem("refresh")

            try {
                const res = await api.post("/token/refresh/", {
                    refresh: refreshToken,
                });
                if(res.status === 200) {
                    localStorage.setItem("access", res.data.access)
                    setIsAuthorized(true)
                } else {
                    setIsAuthorized(false)
                }
            } catch (error) {
                console.log(error)
                setIsAuthorized(false)
            }
        };
        auth();
    }, [])


    useEffect(() => {
        if (isAuthorized === false) {
          router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        }
      }, [isAuthorized, router, pathname]);


    if(isAuthorized === null){
        return <Spinner />
    }


  return isAuthorized ? children : null ;

}

export default ProtectedRoute