import React, { useState, useRef, useEffect } from "react";
import api from "../api/axios";

const TransferPage = () => {
  const [toUsername, setToUsername] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [successPopup, setSuccessPopup] = useState(false);
  const [sentAmount, setSentAmount] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [newBalance, setNewBalance] = useState("");

  const userRef = useRef();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!toUsername || !amount || parseFloat(amount) <= 0) {
      setError("Please enter a valid username and amount.");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/transactions/transfer", {
        toUsername,
        amount: parseFloat(amount),
      });

      setSentAmount(res.data.amount);
      setReceiverName(toUsername);
      setNewBalance(res.data.senderNewBalance);
      setSuccessPopup(true);

      setToUsername("");
      setAmount("");
    } catch (err) {
      setError(err.response?.data?.message || "Transfer failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex justify-center items-start py-20 px-4">
      {/* MAIN CARD */}
      <div className="w-full max-w-lg bg-white border border-green-200 rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-bold text-green-900 mb-8 text-center">
          Send Money
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* USERNAME */}
          <div>
            <label className="block text-green-900 font-semibold mb-2 text-lg">
              Recipient Username
            </label>
            <input
              ref={userRef}
              type="text"
              value={toUsername}
              onChange={(e) => {
                setToUsername(e.target.value);
                setError("");
              }}
              placeholder="Enter username"
              className="
                w-full px-4 py-3 rounded-xl border border-green-300 bg-green-50
                focus:ring-2 focus:ring-green-400 text-gray-900 text-lg
              "
            />
          </div>

          {/* AMOUNT */}
          <div>
            <label className="block text-green-900 font-semibold mb-2 text-lg">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError("");
              }}
              placeholder="Enter amount"
              className="
                w-full px-4 py-3 rounded-xl border border-green-300 bg-green-50
                focus:ring-2 focus:ring-green-400 text-gray-900 text-lg
              "
            />
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-600 text-sm font-medium bg-red-100 border border-red-300 rounded-lg p-3">
              {error}
            </p>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3 rounded-xl bg-green-200 text-green-900
              font-semibold text-lg border border-green-300
              hover:bg-green-300 transition-all
            "
          >
            {loading ? "Processing..." : "Transfer"}
          </button>
        </form>
      </div>

      {/* SUCCESS POPUP — PREMIUM & MATCHED WITH OTHER PAGES */}
      {successPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/25 backdrop-blur-sm z-50">
          <div
            className="
              bg-white rounded-3xl p-10 w-full max-w-sm
              border border-green-300 shadow-[0_8px_40px_rgba(0,0,0,0.08)]
              text-center animate-scaleIn
            "
          >
            <div className="text-5xl mb-4">💸</div>

            <h2 className="text-2xl font-bold text-green-900 mb-3">
              Transfer Successful!
            </h2>

            <p className="text-green-800 text-lg font-semibold mb-2">
              ₹{sentAmount} sent to{" "}
              <span className="font-bold">({receiverName})</span>
            </p>

            <p className="text-gray-700 text-lg font-medium mt-4 mb-1">
              New Balance:
            </p>

            <p className="text-green-700 text-3xl font-extrabold mb-8 tracking-wide">
              ₹{newBalance}
            </p>

            <button
              onClick={() => setSuccessPopup(false)}
              className="
                px-6 py-3 rounded-xl text-white text-lg font-semibold
                bg-gradient-to-r from-green-300 to-green-500
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

export default TransferPage;
