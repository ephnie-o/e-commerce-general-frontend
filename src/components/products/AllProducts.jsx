'use client'

import api from "@/api"
import Error from "@/app/error"
import { randomValue } from "@/GenerateCartCode"
import { useEffect, useState } from "react"
import PlaceHolderContainer from "../ui/PlaceHolderContainer"
import CardContainer from "./CardContainer"

const AllProducts = () => {

    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        if(localStorage.getItem("cart_code") == null){
            localStorage.setItem("cart_code", randomValue)
        }
    }, [])

    useEffect(() => {
        setLoading(true)
        api.get("products/")
        .then(res => {
            console.log(res.data)
            setProducts(res.data)
            setLoading(false)
            setError("")
        })

        .catch(err => {
            console.log(err.message)
            setLoading(false)
            setError(err.message)
        })
    }, [])

    return (
        <>
        {error && <Error error={error} />}
        {loading && <PlaceHolderContainer />}
        {loading || error != '' || <CardContainer products={products} />}
        </>
    )
}

export default AllProducts