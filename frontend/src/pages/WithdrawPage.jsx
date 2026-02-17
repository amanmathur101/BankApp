import React, { useState, useRef, useEffect } from "react";
import api from "../api/axios";

const WithdrawPage = () => {
  const [amount, setAmount] = useState("");
  const [successPopup, setSuccessPopup] = useState(false);
  const [newBalance, setNewBalance] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const amountRef = useRef();

  useEffect(() => {
    amountRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/transactions/withdraw", {
        amount: parseFloat(amount),
      });

      setNewBalance(`₹${res.data.newBalance}`);
      setAmount("");
      setSuccessPopup(true);
    } catch (err) {
      const backendMessage =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data?.description ||
        "";

      const currentBalance =
        err?.response?.data?.balance ||
        err?.response?.data?.currentBalance ||
        null;

      if (
        backendMessage.toLowerCase().includes("insufficient") ||
        (currentBalance && parseFloat(amount) > parseFloat(currentBalance))
      ) {
        setError(
          `Insufficient Balance. You attempted ₹${amount}, available ₹${currentBalance}.`
        );
        return;
      }

      setError("Withdrawal failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* BG MATCHED WITH WITHDRAW QUICK-LINK CARD */}
      <div
        className={`min-h-screen flex justify-center items-start py-20 px-4 transition ${
          successPopup ? "backdrop-blur-sm pointer-events-none" : ""
        } bg-[radial-gradient(circle_at_15%_15%,#ede9ff_0%,#f5f0ff_55%,#ffffff_100%)]`}
      >
        {/* MAIN CARD */}
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-violet-300 p-12 animate-fadeSlide">
          <h1 className="text-3xl font-bold text-violet-900 mb-10 text-center tracking-tight">
            Withdraw Funds
          </h1>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-7">
            <div>
              <label className="block text-violet-900 font-semibold mb-2 text-lg">
                Amount
              </label>

              {/* ⭐ DUAL BORDER LIKE YOUR GREEN SAMPLE (Black + Purple) */}
              <input
                ref={amountRef}
                type="number"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                placeholder="Enter amount"
                className="
                  w-full px-5 py-4 rounded-xl text-lg font-medium
                  bg-[#f3edff]
                  border-[3px] border-black
                  outline outline-[3px] outline-violet-400
                  focus:outline-violet-600
                  transition-all shadow-sm
                "
              />
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-600 text-sm font-semibold bg-red-100 border border-red-300 rounded-xl p-3 animate-fadeIn">
                {error}
              </p>
            )}

            {/* BUTTON — PREMIUM VIOLET */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full py-4 rounded-xl text-white text-xl font-semibold
                bg-gradient-to-r from-violet-400 to-violet-700 shadow-lg
                hover:shadow-[0_10px_25px_rgba(139,92,246,0.35)]
                hover:scale-[1.02] active:scale-[0.98]
                transition-all duration-300
              "
            >
              {loading ? "Processing..." : "Withdraw"}
            </button>
          </form>
        </div>
      </div>

      {/* SUCCESS POPUP — ANIMATED */}
      {successPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/25 backdrop-blur-sm z-50">
          <div
            className="
              bg-white rounded-3xl p-10 w-full max-w-sm
              border border-violet-300 shadow-[0_8px_40px_rgba(0,0,0,0.08)]
              text-center animate-scaleIn
            "
          >
            <div className="text-5xl mb-3">💸</div>
            <h2 className="text-2xl font-bold text-violet-900 mb-2">
              Withdrawal Successful!
            </h2>

            <p className="text-gray-700 text-lg font-medium mb-1">
              Remaining Balance:
            </p>

            <p className="text-violet-700 text-3xl font-extrabold mb-8 tracking-wide">
              {newBalance}
            </p>

            <button
              onClick={() => setSuccessPopup(false)}
              className="
                px-6 py-3 rounded-xl bg-gradient-to-r from-violet-300 to-violet-500
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

export default WithdrawPage;
