"use client"

import api from '@/api'
import { useEffect, useState } from 'react'
import Spinner from '../ui/Spinner'
import OrderHistory from './OrderHistory'
import UserInfo from './UserInfo'

const UserProfilePage = () => {

  const [userInfo, setUserInfo] = useState({})
  const [orderItems, setOrderItems] =useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get("user_info")
    .then(res => {
      console.log(res.data)
      setUserInfo(res.data)
      setOrderItems(res.data.items)
      setLoading(false)
    })
    .catch(() => {
      alert("Failed to load user information. Please try again.");
    })
    .finally(() => {
      setLoading(false);
    });
  }, [])

  if(loading) {
    return <Spinner loading={loading} />
  }

  return (
    <div className="bg-gray-50 py-10">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <UserInfo userInfo={userInfo} />
        </div>
        <div className="lg:col-span-2">
          <OrderHistory orderItems={orderItems} />
        </div>
      </div>
    </div>
  )
}

export default UserProfilePage