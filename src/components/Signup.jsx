import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
    taxId: yup
        .string()
        .matches(/^[A-Z0-9]{9,12}$/, "Invalid Tax ID format")
        .required("Tax ID is required"),
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email address").required("Email is required"),
    phone: yup
        .string()
        .matches(/\+?[1-9]\d{1,14}$/, "Invalid phone number")
        .required("Phone number is required"),
    street: yup.string().required("Street address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    postalCode: yup
        .string()
        .matches(/^\d{5}(-\d{4})?$/, "Invalid postal code")
        .required("Postal code is required"),
    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .matches(/[A-Z]/, "Must contain an uppercase letter")
        .matches(/[a-z]/, "Must contain a lowercase letter")
        .matches(/\d/, "Must contain a number")
        .matches(/[\W_]/, "Must contain a special character")
        .required("Password is required"),
});

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = (data) => {
        console.log("User Data:", data);
        alert("Signup Successful!");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-200 p-10">
            <div className="w-full max-w-lg bg-gradient-to-b from-[#20224e] to-[#2b2d78] text-white p-8 rounded-xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center text-[#eeb029] mb-6">
                    Create an Account
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Tax ID */}
                    <div>
                        <label className="text-sm font-semibold">Tax ID</label>
                        <input
                            type="text"
                            {...register("taxId")}
                            className="w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
                        />
                        <p className="text-red-500 text-xs">{errors.taxId?.message}</p>
                    </div>

                    {/* Username */}
                    <div>
                        <label className="text-sm font-semibold">Username</label>
                        <input
                            type="text"
                            {...register("username")}
                            className="w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
                        />
                        <p className="text-red-500 text-xs">{errors.username?.message}</p>
                    </div>

                    {/* Email */}
                    <div>
                        <label className="text-sm font-semibold">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
                        />
                        <p className="text-red-500 text-xs">{errors.email?.message}</p>
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="text-sm font-semibold">Phone</label>
                        <input
                            type="text"
                            {...register("phone")}
                            className="w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
                        />
                        <p className="text-red-500 text-xs">{errors.phone?.message}</p>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="text-sm font-semibold">Street Address</label>
                        <input
                            type="text"
                            {...register("street")}
                            className="w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
                        />
                        <p className="text-red-500 text-xs">{errors.street?.message}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-semibold">City</label>
                            <input
                                type="text"
                                {...register("city")}
                                className="w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
                            />
                            <p className="text-red-500 text-xs">{errors.city?.message}</p>
                        </div>
                        <div>
                            <label className="text-sm font-semibold">State</label>
                            <input
                                type="text"
                                {...register("state")}
                                className="w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
                            />
                            <p className="text-red-500 text-xs">{errors.state?.message}</p>
                        </div>
                    </div>

                    <div>
                        <label className="text-sm font-semibold">Postal Code</label>
                        <input
                            type="text"
                            {...register("postalCode")}
                            className="w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
                        />
                        <p className="text-red-500 text-xs">{errors.postalCode?.message}</p>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="text-sm font-semibold">Password</label>
                        <input
                            type="password"
                            {...register("password")}
                            className="w-full mt-1 px-3 py-2 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
                        />
                        <p className="text-red-500 text-xs">{errors.password?.message}</p>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className=" w-full mt-4 bg-[#eeb029] text-[#2b2d78] py-2 rounded-md font-semibold hover:scale-105 transition"
                    >
                        Sign Up
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-[#eeb029] font-semibold hover:underline">
                        Log in
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;