// src/pages/FinalDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import AuthContext from "../context/AuthContext";

const FinalDashboard = () => {
  const { logout } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const res = await api.get("/account/me");
        setAccount(res.data);
      } catch {
        setAccount({ username: "Guest User", balance: 0, role: "USER" });
      } finally {
        setLoading(false);
      }
    };
    fetchAccount();
  }, []);

  const username = account?.username ?? "User";
  const initial = (username.charAt(0) || "U").toUpperCase();

  // 🌈 Generate deterministic pastel theme for user
  const generatePastel = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash) % 360;
    const pastel = `hsl(${hue} 80% 92%)`;
    const pastelStrong = `hsl(${hue} 72% 45%)`;
    return { pastel, pastelStrong };
  };

  const { pastel, pastelStrong } = generatePastel(username);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,#ffffff_0%,#f2f6ff_18%,#dde7ff_40%,#d0dbf0_65%,#e6edff_100%)] text-gray-700">
      <div className="max-w-5xl mx-auto">
        {/* HEADER */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="w-12 h-12 rounded-full bg-white/80 border border-sky-200 flex items-center justify-center text-xl font-bold text-sky-600 transition group-hover:scale-105 group-hover:rotate-2">
                B
              </div>
              <svg
                className="absolute -inset-1 w-14 h-14 opacity-0 group-hover:opacity-100 transition-transform transform group-hover:rotate-12"
                viewBox="0 0 64 64"
              >
                <defs>
                  <linearGradient id="logoRing" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#60A5FA" stopOpacity="0.6" />
                    <stop offset="1" stopColor="#3B82F6" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="url(#logoRing)"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">Bankly</h1>
              <p className="text-sm text-gray-500">Simple, smart banking</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/transactions")}
              className="px-4 py-2 rounded-lg bg-white/60 backdrop-blur-sm border border-gray-200 text-gray-700 font-medium shadow-sm hover:bg-indigo-100 hover:text-indigo-600 hover:shadow-md hover:-translate-y-[1px] transition"
            >
              Transactions
            </button>

            <div className="flex items-center gap-3">
              <div className="hidden md:block text-right mr-2">
                <div className="text-sm text-gray-500">Signed in as</div>
                <div className="text-sm font-medium text-gray-800">
                  {username}
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="px-4 py-2 rounded-lg bg-red-100 text-red-700 border border-red-200 font-medium hover:bg-red-600 hover:text-white hover:shadow-md hover:-translate-y-[1px] transition"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT SECTION */}
          <section className="lg:col-span-7 space-y-6">
            {/* 🌈 BALANCE CARD — DYNAMIC PASTEL */}
            <div
              className="rounded-2xl p-6 backdrop-blur-md shadow-[0_3px_10px_rgba(0,0,0,0.05)]
              hover:shadow-[0_10px_24px_rgba(0,0,0,0.12)] hover:-translate-y-[2px] transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${pastel} 0%, #ffffff 60%)`,
                border: `1px solid ${pastelStrong}55`, // 55 = soft opacity
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    {/* Avatar */}
                    <div
                      className="w-20 h-20 rounded-full bg-white shadow-inner flex items-center justify-center text-2xl font-semibold transition group-hover:scale-[1.08] group-hover:rotate-2"
                      style={{
                        border: `1px solid ${pastelStrong}60`,
                        color: pastelStrong,
                      }}
                    >
                      {initial}
                    </div>

                    {/* Hover ring */}
                    <svg
                      className="absolute inset-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition pointer-events-none"
                      viewBox="0 0 64 64"
                    >
                      <circle
                        cx="32"
                        cy="32"
                        r="26"
                        stroke={pastelStrong}
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                      />
                    </svg>
                  </div>

                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      {username}
                    </div>
                    <div className="text-sm text-gray-600">
                      {account?.role ?? "USER"}
                    </div>
                  </div>
                </div>

                {/* Balance */}
                <div className="text-right">
                  <div className="text-sm text-gray-600">Available</div>
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{Number(account?.balance ?? 0).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK LINKS TITLE */}
            <div className="px-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Quick Links
              </h3>
              <p className="text-sm text-gray-500">
                Common actions for your account
              </p>
            </div>

            {/* QUICK LINKS GRID (unchanged) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Deposit */}
              <button
                onClick={() => navigate("/deposit")}
                className="rounded-xl p-5 cursor-pointer flex items-center justify-between
                bg-[#dff4ff] border border-[#7acbff] shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                hover:bg-[#ebf9ff] hover:border-[#4db7ff] hover:shadow-[0_8px_22px_rgba(0,0,0,0.12)]
                hover:-translate-y-[2px] transition-all duration-300 hover:ring-2 hover:ring-[#4db7ff]/30"
              >
                <div>
                  <div className="text-sm text-sky-700 font-medium">
                    Deposit
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    Add funds
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow hover:shadow-[0_0_14px_rgba(56,144,255,0.35)] transition">
                  →
                </div>
              </button>

              {/* Withdraw */}
              <button
                onClick={() => navigate("/withdraw")}
                className="rounded-xl p-5 cursor-pointer flex items-center justify-between
                bg-[#ece7ff] border border-[#a797ff] shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                hover:bg-[#f4f1ff] hover:border-[#8a74ff] hover:shadow-[0_8px_22px_rgba(0,0,0,0.12)]
                hover:-translate-y-[2px] transition-all duration-300 hover:ring-2 hover:ring-[#8a74ff]/30"
              >
                <div>
                  <div className="text-sm text-indigo-700 font-medium">
                    Withdraw
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    Take out
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow hover:shadow-[0_0_14px_rgba(99,102,241,0.35)] transition">
                  →
                </div>
              </button>

              {/* Transfer */}
              <button
                onClick={() => navigate("/transfer")}
                className="rounded-xl p-5 cursor-pointer flex items-center justify-between
                bg-[#dbffef] border border-[#6fe7c8] shadow-[0_2px_8px_rgba(0,0,0,0.05)]
                hover:bg-[#e8fff6] hover:border-[#32d9ad] hover:shadow-[0_8px_22px_rgba(0,0,0,0.12)]
                hover:-translate-y-[2px] transition-all duration-300 hover:ring-2 hover:ring-[#32d9ad]/30"
              >
                <div>
                  <div className="text-sm text-teal-700 font-medium">
                    Transfer
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    Send money
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow hover:shadow-[0_0_14px_rgba(45,212,191,0.35)] transition">
                  →
                </div>
              </button>

              {/* Transactions */}
              <button
                onClick={() => navigate("/transactions")}
                className="rounded-xl p-5 cursor-pointer flex items-center justify-between
bg-[radial-gradient(circle_at_20%_20%,#fff8de_0%,#fff4c8_45%,#fff1b6_100%)]
border border-[#ffe28a]
shadow-[0_2px_8px_rgba(0,0,0,0.05)]
hover:bg-[radial-gradient(circle_at_20%_20%,#fffce6_0%,#fff6d0_45%,#ffeeae_100%)]
hover:border-[#ffcf38]
hover:shadow-[0_8px_22px_rgba(0,0,0,0.12)]
hover:-translate-y-[2px]
transition-all duration-300 hover:ring-2 hover:ring-[#ffcf38]/30"
              >
                <div>
                  <div className="text-sm text-amber-700 font-medium">
                    History
                  </div>
                  <div className="text-lg font-semibold text-gray-900">
                    Transactions
                  </div>
                </div>
                <div className="bg-white p-2 rounded-lg shadow hover:shadow-[0_0_14px_rgba(249,146,45,0.35)] transition">
                  →
                </div>
              </button>
            </div>
          </section>

          {/* WIDGET PANEL */}
          <aside className="lg:col-span-5">
            <div className="rounded-2xl bg-white/55 backdrop-blur-lg border border-gray-200 p-6 h-full flex flex-col items-center justify-center shadow-[0_3px_12px_rgba(0,0,0,0.05)]">
              <div className="text-4xl mb-3 opacity-70">📈</div>
              <p className="text-gray-600 font-medium">No widgets yet</p>
              <p className="text-gray-400 text-sm">
                Quick links are on the left
              </p>
            </div>
          </aside>
        </main>
      </div>
    </div>
  );
};

export default FinalDashboard;
