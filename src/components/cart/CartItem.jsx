"use client"

import { HiMiniXMark } from "react-icons/hi2";
import api, { BASE_URL } from "@/api"
import { useState } from "react"
import { useCart } from "@/context/CartContext";
import { toast } from "react-toastify";


const CartItem = ({item, setCartTotal, cartItems, setCartItems}) => {
    const {setNumCartItems} = useCart()

    const [quantity, setQuantity] = useState(item.quantity)
    const [loading, setloading] = useState(false)

    const itemData = {quantity:quantity, item_id:item.id}
    const itemID = {item_id: item.id}

    function deleteCartItem() {
        const confirmDelete = window.confirm("Are you sure you want to delete this cart item")

        if(confirmDelete){
            api.post("cart/delete_item/", itemID)
            .then(res => {
                console.log(res.data)
                toast.success("Cart item deleted succesfully")
                const updatedItems = cartItems.filter(cartitem => cartitem.id !== item.id);
                setCartItems(updatedItems)
                setCartTotal(updatedItems.reduce((acc, curr) => acc + curr.total, 0)
                )
                setNumCartItems(updatedItems.reduce((acc, curr) => acc + curr.quantity, 0)
                )
            })
            .catch(err => {
                console.log(err.message)
            })
        }
    }


    function updateCartitem() {
        setloading(true)
        api.patch("cart/update_item/", itemData)
        .then(res => {
            console.log(res.data)
            setloading(false)
            toast.success("Cart item updated successfully")
            const updatedItems = cartItems.map(cartitem =>
                cartitem.id === item.id ? res.data.data : cartitem
            );
            setCartTotal(updatedItems.reduce((acc, curr) => acc + curr.total, 0)
            )
            setNumCartItems(updatedItems.reduce((acc, curr) => acc + curr.quantity, 0)
            )
        })
        .catch(err =>{
            console.log(err.message)
            setloading(false)
        })
    }


    return (
        <section aria-labelledby="cart-heading" className="lg:col-span-7">

            <div role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                <div className="flex py-6 sm:py-10">
                    <div className="shrink-0">
                    <img
                        alt={item.product.name}
                        src={`${BASE_URL}${item.product.image}`}
                        className="size-24 rounded-md object-cover sm:size-48"
                    />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                        <div className="flex justify-between">
                            <h3 className="text-sm">
                            <p className="font-medium text-gray-700 hover:text-gray-800">
                                {item.product.name}
                            </p>
                            </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{`$${item.product.price}`}</p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="inline-grid w-full max-w-16 grid-cols-1">
                            <input
                            type="number"
                            min="1"
                            className='col-start-1 row-start-1 rounded-md bg-white appearance-none py-1.5 pl-3 pr-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            />
                        </div>

                        <div className="absolute right-0 top-0">
                            <button onClick={e => {e.preventDefault();  updateCartitem();}} disabled={loading} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-5">{loading ? "Updating" : "Update"}</button>
                            <button type="button" onClick={deleteCartItem} className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Remove</span>
                            <HiMiniXMark aria-hidden="true" className="size-5" />
                            </button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section>
  )
}

export default CartItem