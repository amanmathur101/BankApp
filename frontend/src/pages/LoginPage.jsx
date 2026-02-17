import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { username, password });

      login();
      navigate("/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7f3ff] to-white flex justify-center items-center px-4">

      {/* LOGIN CARD */}
      <div className="w-full max-w-md bg-white border border-gray-100 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-10">

        <h1 className="text-3xl font-extrabold text-center text-gray-900 mb-8">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* USERNAME */}
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="
                w-full px-4 py-3 rounded-xl border border-purple-200
                bg-purple-50 placeholder:text-gray-400
                focus:ring-2 focus:ring-purple-300 outline-none
                text-gray-900 font-medium text-lg
              "
              placeholder="Enter username"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full px-4 py-3 rounded-xl border border-purple-200
                bg-purple-50 placeholder:text-gray-400
                focus:ring-2 focus:ring-purple-300 outline-none
                text-gray-900 font-medium text-lg
              "
              placeholder="Enter password"
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-600 text-sm font-semibold bg-red-100 border border-red-300 p-3 rounded-xl">
              {error}
            </p>
          )}

          {/* LOGIN BUTTON */}
          <button
            type="submit"
            className="
              w-full py-3 mt-2 rounded-xl bg-purple-100 text-purple-900
              font-semibold text-lg border border-purple-200
              hover:bg-purple-200 hover:border-purple-300
              active:scale-[0.98] transition-all
            "
          >
            Login
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-600 font-semibold hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;
