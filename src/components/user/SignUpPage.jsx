"use client"

import { useState } from "react";
import api from "@/api"
import Error from "@/app/error"
import { useRouter } from "next/navigation"

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    first_name: "",
    last_name: "",
    city: "",
    state: "",
    address: "",
    password: "",
    confirm_password: "",
  });

  const router = useRouter()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true)

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    api.post("register/", formData)
    .then(res => {
      console.log(res.data)
      setFormData({
        username: "",
        email: "",
        phone: "",
        first_name: "",
        last_name: "",
        city: "",
        state: "",
        address: "",
        password: "",
        confirm_password: "",
      });
      setLoading(false)
      router.push("/login")
    })
    .catch(err => {
      console.log(err)
      setLoading(false)

      const errorDetail = err.response?.data?.error;
      const errorMessage = errorDetail
        ? errorDetail.replace(/\[ErrorDetail\(string='(.*?)'.*/, "$1") // Extract the string part of the error
        : "Something went wrong. Please try again."; // Fallback message

      setError(errorMessage); // Set the extracted error message
      console.log(errorMessage);
      // setError(err.response?.data?.error)
    })
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = e => {
    const email = e.target.value
    setFormData((prev) => ({ ...prev, email }))
    if (!validateEmail(email)){
      setError("Invalid email format.");
    } else {
      setError("");
    }
  }

  return (
    <div className="bg-gray-100 flex justify-center min-h-full flex-1">
      <div className="p-6 rounded w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Create your account</h2>
        <form onSubmit={handleSubmit}>
          {[
            { label: "Username", name: "username", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phone", type: "text" },
            { label: "First Name", name: "first_name", type: "text" },
            { label: "Last Name", name: "last_name", type: "text" },
            { label: "City", name: "city", type: "text" },
            { label: "State", name: "state", type: "text" },
            { label: "Address", name: "address", type: "text" },
            { label: "Password", name: "password", type: "password" },
            { label: "Confirm Password", name: "confirm_password", type: "password" },
          ].map(({ label, name, type }) => (
            <div className="mb-4" key={name}>
              <label className="block text-sm/6 font-medium text-gray-900">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                required
              />
            </div>
          ))}

          {error && <Error error={error} />}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-10">
          <div className="relative">
            <div aria-hidden="true" className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="mb-3 relative flex justify-center text-sm/6 font-medium">
              <span className="bg-white px-6 text-gray-900">Already have an account?</span>
            </div>
          </div>

          <div>
            <button
              onClick={() => router.push("/login")}
              className="flex w-full justify-center rounded-md bg-indigo-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage