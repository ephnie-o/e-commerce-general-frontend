'use client'
import Link from 'next/link'
import {FaCartShopping} from 'react-icons/fa6'
import { useState, useEffect, useContext } from 'react'
import api from '@/api';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { AuthContext } from '@/context/AuthContext';

export default function NavBar() {

  const { isAuthenticated, setIsAuthenticated, username } = useContext(AuthContext)

  const [cartCode, setCartCode] = useState(null);
  const {numCartItems, setNumCartItems} = useCart();

  useEffect(() => {
    const storedCartCode = localStorage.getItem("cart_code");
    setCartCode(storedCartCode);
  }, []);

  useEffect(() => {
    if(cartCode){
      api.get(`get_cart_stat?cart_code=${cartCode}`)
      .then(res => {
        console.log(res.data)
        setNumCartItems(res.data.num_of_items)
      })
      .catch(err => {
        console.log(err.message)
      })
    }
  }, [cartCode])

  function handleLogout() {
    localStorage.removeItem("access")
    setIsAuthenticated(false)
  }

  let isActive = (path) => usePathname() === path;

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 text-black">
            <span>E-COMMERCE</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-x-6">
          {isAuthenticated ?
          (
          <>
          <Link href="/profile">
            <span
              className={`text-sm font-semibold ${
              isActive('/profile') ? 'text-indigo-600' : 'text-gray-900'
              }`}
            >
              Hi {username}
            </span>
          </Link>
          <Link href="/">
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
            >
              Log out
            </button>
          </Link>
          </>
          )
          :
          (
          <>
            <Link href="/login"
              className={`text-sm font-semibold ${
              isActive('/login') ? 'text-indigo-600' : 'text-gray-900'
              }`}
            >
              Log in
            </Link>
            <Link
              href="#"
              className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 ${
                isActive('/signup') ? 'bg-white text-gray-900' : 'bg-indigo-600'
              }`}
            >
              Sign up
            </Link>
          </>
          )
          }

        </div>
        <Link href='/cart' className='group -m-2 flex items-center p-2'>
            <FaCartShopping className='size-6 shrink-0 text-black' />
            {numCartItems == 0 ||
            <span className="ml-2 text-sm font-medium text-black">{numCartItems}</span>
            }
            <span className="sr-only">items in cart, view bag</span>
        </Link>
      </nav>
    </header>
  )
}
