'use client'

import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    TabGroup,
    TabPanel,
    TabPanels,
  } from '@headlessui/react'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BASE_URL } from "@/api"
import api from '@/api'
import RelatedProducts from './RelatedProducts'
import LoadingSkeleton from '../ui/LoadingSkeleton'
import { CiHeart } from "react-icons/ci";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useCart } from '@/context/CartContext'
import { toast } from 'react-toastify'


const ProductPage = () => {

    const {slug} = useParams()
    const [product, setProduct] = useState({})
    const [similarProducts, setSImilarProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [cartCode, setCartCode] = useState(null);
    const [inCart, setInCart] = useState(false)
    const {setNumCartItems} = useCart();


    useEffect(() => {
      if(product.id){
        api.get(`product_in_cart?cart_code=${cartCode}&product_id=${product.id}`)
      .then(res => {
        console.log(res.data)
        setInCart(res.data.product_in_cart)
      })
      .catch(err => {
        console.log(err.message)
      })
      }
    }, [cartCode, product.id])

    useEffect(() => {
        const storedCartCode = localStorage.getItem("cart_code");
        setCartCode(storedCartCode);
    }, []);

    const newItem = {cart_code: cartCode, product_id:product.id}

    function add_item() {
        api.post("add_item/", newItem)
        .then(res => {
            console.log(res.data)
            setInCart(true)
            toast.success("Product added to cart")
            setNumCartItems(curr => curr + 1)
        })
        .catch(err => {
            console.log(err.message)
        })
    }


    useEffect(function(){
        setLoading(true)
        api.get(`product_detail/${slug}`)
        .then(res => {
            console.log(res.data)
            setProduct(res.data)
            setSImilarProducts(res.data.similar_products || [])
            setLoading(false)
        })
        .catch(err => {
            console.log(err.message)
        })
    }, [slug])

    if(loading){
        return <LoadingSkeleton />
    }

  return (
    <div className='bg-gray-100'>
        <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <TabGroup className="flex flex-col-reverse">

              <TabPanels>
                  <TabPanel key={product.slug}>
                    <img alt={product.slug} src={`${BASE_URL}${product.image}`} className="aspect-square w-full object-cover sm:rounded-lg" />
                  </TabPanel>
              </TabPanels>
            </TabGroup>

            {/* Product info */}
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  className="space-y-6 text-base text-gray-700"
                />
              </div>

              <form className="mt-6">
                <div className="mt-10 mb-10 flex">
                  <button
                    type="button"
                    onClick={add_item}
                    disabled={inCart}
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    {inCart ? "Product added to cart" : "Add to cart"}
                  </button>

                  <button
                    type="button"
                    className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <CiHeart aria-hidden="true" className="size-6 shrink-0" />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                    <Disclosure key={product.name} as="div">
                      <h3>
                        <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                          <span className="text-sm font-medium text-gray-900 group-data-[open]:text-indigo-600">
                            {product.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <FaPlus
                              aria-hidden="true"
                              className="block size-6 text-gray-400 group-hover:text-gray-500 group-data-[open]:hidden"
                            />
                            <FaMinus
                              aria-hidden="true"
                              className="hidden size-6 text-indigo-400 group-hover:text-indigo-500 group-data-[open]:block"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pb-6">
                        <ul
                          role="list"
                          className="list-disc space-y-1 pl-5 text-sm/6 text-gray-700 marker:text-gray-300"
                        >
                            <p key={product.slug} className="pl-2">
                              {product.description}
                            </p>
                        </ul>
                      </DisclosurePanel>
                    </Disclosure>
                </div>
              </section>
            </div>
          </div>
          <section aria-labelledby="related-heading" className="mt-10 border-t border-gray-200 px-4 py-16 sm:px-0">
            <h2 id="related-heading" className="text-2xl font-bold text-gray-900">
                Related Products
            </h2>
            <RelatedProducts products={similarProducts} />
          </section>
        </div>
        </main>
    </div>
  )
}

export default ProductPage