import React from 'react'

const Profile = () => {
    const user = {
        name: "John Doe",
        email: "johndoe@example.com",
        phone: "+1 234 567 890",
        address: {
            street: "123 Main St",
            city: "Los Angeles",
            state: "CA",
            postalCode: "90001",
        },
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-200">
            <div className="w-[40%] p-20 bg-[#2b2d78] text-white p-6 rounded-xl shadow-lg relative">
                {/* User Icon */}
                <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-[#eeb029] rounded-full flex items-center justify-center">
                        <svg
                            width="50"
                            height="50"
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
                    <h2 className="mt-4 text-2xl font-semibold">{user.name}</h2>
                    <p className="text-sm opacity-80">{user.email}</p>
                </div>

                {/* User Details */}
                <div className="mt-6 text-lg space-y-2">
                    <p>
                        <strong>📞 Phone:</strong> {user.phone}
                    </p>
                    <p>
                        <strong>🏠 Address:</strong> {user.address.street},{" "}
                        {user.address.city}, {user.address.state} {user.address.postalCode}
                    </p>
                </div>

                {/* Buttons */}
                <div className="mt-6 flex justify-center gap-6">
                    <button className="flex items-center gap-2 bg-[#eeb029] px-4 py-2 rounded-md text-[#2b2d78] font-semibold shadow-lg hover:scale-115 transition">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                                stroke="currentColor"
                                strokeWidth="2"
                            />
                            <path
                                d="M7 12h10M7 16h10"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                        Tax Documents
                    </button>
                    <button className="flex items-center gap-2 bg-[#2b2d78] text-white px-4 py-2 rounded-md border border-[#eeb029] font-semibold shadow-lg hover:scale-115 transition">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M3 12h18M3 6h18M3 18h18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                        Transactions
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Profile