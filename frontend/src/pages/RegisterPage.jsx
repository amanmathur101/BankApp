import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/register", { username, password });
      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f0ff] to-white flex justify-center items-start py-20 px-4">

      {/* CARD */}
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] p-12">
        
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-10 tracking-tight">
          Create an Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-7">

          {/* USERNAME INPUT */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="
                w-full px-4 py-3 rounded-xl
                border border-purple-200 bg-purple-50
                focus:ring-2 focus:ring-purple-300 focus:outline-none
                text-gray-900 font-medium text-lg
                transition shadow-sm
              "
            />
          </div>

          {/* PASSWORD INPUT */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-lg">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="
                w-full px-4 py-3 rounded-xl
                border border-purple-200 bg-purple-50
                focus:ring-2 focus:ring-purple-300 focus:outline-none
                text-gray-900 font-medium text-lg
                transition shadow-sm
              "
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-600 text-sm font-semibold bg-red-100 border border-red-300 rounded-xl p-3">
              {error}
            </p>
          )}

          {/* SUCCESS */}
          {success && (
            <p className="text-purple-700 text-sm font-semibold bg-purple-100 border border-purple-300 rounded-xl p-3">
              {success}
            </p>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="
              w-full py-3 rounded-xl bg-purple-100 text-purple-900 
              font-semibold text-lg border border-purple-200
              hover:bg-purple-200 hover:border-purple-300
              active:scale-[0.98]
              transition-all shadow-sm
            "
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-700 mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-700 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
