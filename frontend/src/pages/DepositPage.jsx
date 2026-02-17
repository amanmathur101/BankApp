import React, { useState } from "react";
import api from "../api/axios";

const DepositPage = () => {
  const [amount, setAmount] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [newBalance, setNewBalance] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      const res = await api.post("/transactions/deposit", {
        amount: parseFloat(amount),
      });

      setNewBalance(`₹${res.data.newBalance}`);
      setAmount("");
      setSuccessPopup(true);
    } catch (err) {
      setError(err.response?.data?.message || "Deposit failed.");
    }
  };

  return (
    <div className="relative">
      {/* SAME BACKGROUND SHADE AS QUICK-LINK BLUE CARD */}
      <div
        className={`min-h-screen flex justify-center items-start py-20 px-4 transition ${
          successPopup ? "backdrop-blur-sm pointer-events-none" : ""
        } bg-[radial-gradient(circle_at_8%_12%,#d9f0ff_0%,#eaf6ff_55%,#ffffff_100%)]`}
      >
        {/* MAIN CARD */}
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-sky-200 p-12 animate-fadeSlide">
          {/* TITLE — WITHOUT UNDERLINE */}
          <h1 className="text-3xl font-bold text-sky-900 mb-10 text-center tracking-tight">
            Deposit Funds
          </h1>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-7">
            {/* INPUT WITH SAME BLACK + BLUE BORDER STYLE LIKE TRANSFER PAGE */}
            <div>
              <label className="block text-sky-900 font-semibold mb-2 text-lg">
                Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="
                  w-full px-5 py-4 rounded-xl text-lg font-medium
                  bg-sky-50
                  border-[3px] border-sky-500
                  outline outline-[1.8px] outline-black
                  focus:ring-2 focus:ring-sky-400 focus:outline-none
                  placeholder:text-gray-500
                  transition
                "
              />
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-600 text-sm font-semibold bg-red-100 border border-red-300 rounded-xl p-3 animate-fadeIn">
                {error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              className="
                w-full py-4 rounded-xl text-white text-xl font-semibold
                bg-gradient-to-r from-sky-400 to-sky-700 shadow-lg
                hover:shadow-[0_10px_25px_rgba(56,144,255,0.35)]
                hover:scale-[1.02] active:scale-[0.98]
                transition-all duration-300
              "
            >
              Deposit
            </button>
          </form>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {successPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/25 backdrop-blur-sm z-50">
          <div
            className="
              bg-white rounded-3xl p-10 w-full max-w-sm
              border border-sky-300 shadow-[0_8px_40px_rgba(0,0,0,0.08)]
              text-center animate-scaleIn
            "
          >
            <div className="text-5xl mb-3">💰</div>
            <h2 className="text-2xl font-bold text-sky-900 mb-2">
              Deposit Successful!
            </h2>

            <p className="text-gray-700 text-lg font-medium mb-1">
              Updated Balance:
            </p>

            <p className="text-sky-700 text-3xl font-extrabold mb-8 tracking-wide">
              {newBalance}
            </p>

            <button
              onClick={() => setSuccessPopup(false)}
              className="
                px-6 py-3 rounded-xl bg-gradient-to-r from-sky-300 to-sky-500
                text-white font-semibold text-lg
                hover:scale-[1.03] active:scale-[0.97] transition
              "
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositPage;
