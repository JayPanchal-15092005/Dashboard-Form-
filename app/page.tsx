"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Valid Users
  const validUsers = [
    { username: "Bhargav", password: "Gil@2025" },
    { username: "admin", password: "EBCD@1234" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const userFound = validUsers.find(
      (user) => user.username === username && user.password === password
    );

    if (userFound) {
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("currentUser", username);
      router.push("/dashboard");
    } else {
      setError("Invalid Username or Password");
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#1e293b] rounded-2xl p-10 shadow-xl border border-[#243048]">

        {/* Header */}
        <h1 className="text-3xl font-semibold text-center mb-8">
          Login in to your account
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-[#334155] text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-3 rounded-lg bg-[#0f172a] border border-[#334155] text-white placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-sm text-center bg-red-900/20 p-2 rounded-lg border border-red-700">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 transition text-white font-medium py-3 rounded-xl text-lg shadow-md"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
