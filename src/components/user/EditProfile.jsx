"use client";

import { useState, useEffect, useContext } from "react";
import api from "@/api";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const EditProfile = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const router = useRouter();
    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        country: "",
        city: "",
        address: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }

        api.get("/user/info/")
        .then((res) => {
            setUserData(res.data);
        })
        .catch((err) => {
            console.error("Error fetching user data:", err);
        });
    }, [isAuthenticated, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        api.put("/update_profile/", userData)
        .then((res) => {
            setUserData(res.data.user);
            setLoading(false);
            alert("Profile updated successfully!");
            router.push("/profile")
        })
        .catch((err) => {
            setLoading(false);
            setError("Failed to update profile. Please try again.");
            console.error("Error updating profile:", err);
        });
    };


    return (
        <div className="bg-gray-100 flex justify-center">
            <div className="p-6 rounded w-full max-w-md bg-white shadow-md">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">Edit Profile</h2>

                {error && <p className="text-red-500">{error}</p>}

                <form onSubmit={handleSubmit}>
                    {[
                        { label: "First Name", name: "first_name", type: "text" },
                        { label: "Last Name", name: "last_name", type: "text" },
                        { label: "Phone Number", name: "phone", type: "text" },
                        { label: "Country", name: "country", type: "text" },
                        { label: "City", name: "city", type: "text" },
                        { label: "Address", name: "address", type: "text" },
                    ].map(({ label, name, type }) => (
                        <div className="mb-4" key={name}>
                        <label className="block text-sm/6 font-medium text-gray-900">{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={userData[name]}
                            onChange={handleChange}
                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            required
                        />
                        </div>
                    ))}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible-outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        {loading ? "Updating..." : "Update Profile"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile