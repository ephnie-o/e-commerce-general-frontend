"use client"
import { useRouter } from "next/navigation";


const UserInfo = ({userInfo}) => {
  const router = useRouter();

  return (
    <div className="p-6 bg-gray-100 shadow">
      <h1 className="text-2xl font-semibold text-gray-900">User Profile</h1>
      <div className="mt-4 space-y-4">
        <div className="flex items-center gap-4">
          <img
            src="/ecommercephoto.jpg"
            alt="User Picture"
            className="w-16 h-16 rounded-full object-cover"
          />
          <p className="text-lg font-semibold text-gray-900">{`${userInfo.first_name} ${userInfo.last_name}`}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Username:</p>
          <p className="text-lg font-semibold text-gray-900">{userInfo.username}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Email:</p>
          <p className="text-lg font-semibold text-gray-900">{userInfo.email}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Phone Number:</p>
          <p className="text-lg font-semibold text-gray-900">{userInfo.phone}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">City:</p>
          <p className="text-lg font-semibold text-gray-900">{userInfo.city}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Country:</p>
          <p className="text-lg font-semibold text-gray-900">{userInfo.country}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Member Since:</p>
          <p className="text-lg font-semibold text-gray-900">December 2024</p>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => router.push('/edit_profile')}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          Edit Profile
        </button>
      </div>
    </div>
  )
}

export default UserInfo