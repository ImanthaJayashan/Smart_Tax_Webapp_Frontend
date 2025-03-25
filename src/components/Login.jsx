import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-[#2b2d78] text-white p-8 rounded-xl shadow-lg relative">
        {/* Logo Icon */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-[#eeb029] rounded-full flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="7" r="4" stroke="white" strokeWidth="2" />
              <path
                d="M4 21c0-5 8-5 8-5s8 0 8 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-center mt-4">Welcome Back</h2>
        <p className="text-sm text-center opacity-80 mb-6">Sign in to continue</p>

        {/* Login Form */}
        <form className="space-y-4">
          <div>
            <label className="text-sm font-semibold">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 bg-gray-200 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
          </div>

          <div>
            <label className="text-sm font-semibold">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 bg-gray-200 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#eeb029]"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-[#eeb029] text-[#2b2d78] py-2 rounded-md font-semibold hover:scale-105 transition"
          >
            Sign In
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-4 text-sm text-center">
          <a href="#" className="text-[#eeb029] hover:underline">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;