import React, { useState, useEffect } from "react";
import api from "../api/axios";
import { ArrowDownCircle, ArrowUpCircle, MoveRight } from "lucide-react";

const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get("/transactions");
        setTransactions(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch transactions");
      }
    };
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen px-4 py-14 flex justify-center bg-[#FFFDF4]">
      <div className="w-full max-w-3xl bg-white rounded-3xl border border-[#E8D99A] shadow-[0_10px_35px_rgba(0,0,0,0.06)] p-12">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-[#8A5A0A] text-center mb-10">
          Transaction History
        </h1>

        {/* Error */}
        {error && (
          <p className="text-red-600 bg-red-100 border border-red-200 rounded-lg p-3 mb-4 text-center">
            {error}
          </p>
        )}

        {/* Transactions */}
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-gray-600 text-center">No transactions yet.</p>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-6 rounded-xl bg-[#FFFAE3] border border-[#E8D99A] shadow-sm flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  {tx.type === "DEPOSIT" && (
                    <ArrowDownCircle size={26} className="text-[#137A21]" />
                  )}
                  {tx.type === "WITHDRAWAL" && (
                    <ArrowUpCircle size={26} className="text-[#C63D3D]" />
                  )}
                  {tx.type === "TRANSFER" && (
                    <MoveRight size={26} className="text-[#0A67C1]" />
                  )}

                  <div>
                    <p className="text-lg font-semibold text-[#3D3D3D] uppercase tracking-wide">
                      {tx.type}
                    </p>
                    {tx.toUsername && (
                      <p className="text-sm text-gray-600">
                        Sent to:{" "}
                        <span className="font-semibold text-gray-900">
                          {tx.toUsername}
                        </span>
                      </p>
                    )}
                    <p className="text-sm text-gray-600 mt-1">
                      {new Date(tx.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-xl font-bold ${
                    tx.type === "DEPOSIT"
                      ? "text-[#137A21]"
                      : tx.type === "WITHDRAWAL"
                      ? "text-[#C63D3D]"
                      : "text-[#0A67C1]"
                  }`}
                >
                  ₹{tx.amount}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
