import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import AuthContext from "./context/AuthContext";
import DepositPage from "./pages/DepositPage";
import WithdrawPage from "./pages/WithdrawPage";
import TransferPage from "./pages/TransferPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";

function App() {
  const { isLoggedIn, loading } = useContext(AuthContext);

  const PrivateRoute = ({ children }) => {
    if (loading) return <div>Loading...</div>; 
    return isLoggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/deposit"
          element={
            <PrivateRoute>
              <DepositPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/withdraw"
          element={
            <PrivateRoute>
              <WithdrawPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/transfer"
          element={
            <PrivateRoute>
              <TransferPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/transactions"
          element={
            <PrivateRoute>
              <TransactionHistoryPage />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />}
        />

      </Routes>
    </Router>
  );
}

export default App;
