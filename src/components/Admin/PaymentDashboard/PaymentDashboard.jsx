import React, { useState, useEffect } from "react";
import {
  AccountBalance,
  CurrencyRupee,
  Receipt,
  Search,
  DateRange,
  CheckCircle,
  Visibility,
} from "@mui/icons-material";
import "./PaymentDashboard.css";
import { PaymentRequestStorage } from "../../../supabase/PaymentRequest";
import formatDate from "../../../utils/DateHelper";
import Loader from "../../../structure/Loader/Loader";
import { PaymentStatus } from "../../../json/PaymentStatus";

const PaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });

  const getAmountColorClass = (amount) => {
    if (amount <= 100) return "amount-low";
    if (amount <= 200) return "amount-medium";
    if (amount <= 300) return "amount-high";
    if (amount <= 400) return "amount-very-high";
    return "amount-premium";
  };

  const getLatestPaymentsByRequest = () => {
    // Group payments by request number and get latest status
    const latestPayments = payments.reduce((acc, payment) => {
      const existing = acc[payment.request_number];
      if (
        !existing ||
        new Date(payment.updated_at) > new Date(existing.updated_at)
      ) {
        acc[payment.request_number] = payment;
      }
      return acc;
    }, {});

    return Object.values(latestPayments);
  };

  const stats = [
    {
      icon: <CurrencyRupee />,
      title: "Total Amount",
      value: payments
        .filter((payment) => payment.status === PaymentStatus.Completed)
        .reduce((sum, payment) => sum + (payment.amount || 0), 0),
      color: "#4CAF50",
    },
    {
      icon: <Receipt />,
      title: "Total Payments",
      value: new Set(payments.map((payment) => payment.request_number)).size,
      color: "#2196F3",
    },
    {
      icon: <AccountBalance />,
      title: "Pending Payments",
      value: getLatestPaymentsByRequest().filter(
        (payment) => payment.status !== PaymentStatus.Completed
      ).length,
      color: "#FFC107",
    },
    {
      icon: <CheckCircle />,
      title: "Completed Payments",
      value: getLatestPaymentsByRequest().filter(
        (payment) => payment.status === PaymentStatus.Completed
      ).length,
      color: "#4CAF50", // Changed to green for success
    },
  ];

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setIsLoading(true);
      const response = await PaymentRequestStorage.getAllPayments();
      if (response) {
        setPayments(response);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    // Export functionality implementation
    console.log("Exporting data...");
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement search logic
  };

  const handleDateChange = (type, value) => {
    setDateRange((prev) => ({
      ...prev,
      [type]: value,
    }));
    // Implement date filter logic
  };

  const handleView = (paymentId) => {
    // View payment details implementation
    console.log("Viewing payment:", paymentId);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="payment-dashboard">
        <div className="payment-dashboard-content">
          {/* Stats Section */}
          <div className="payment-dashboard-stats">
            {stats.map((stat, index) => (
              <div className="payment-dashboard-stat-card" key={index}>
                <div className="payment-dashboard-stat-icon">{stat.icon}</div>
                <div className="payment-dashboard-stat-info">
                  <h3>{stat.title}</h3>
                  <p>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Table Section */}
          <div className="payment-dashboard-table-section">
            <div className="payment-dashboard-table-header">
              <h2>Payment History</h2>
              <div className="payment-dashboard-actions">
                {/* Date Filter */}
                <div className="payment-dashboard-date-filter">
                  <DateRange />
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => handleDateChange("start", e.target.value)}
                  />
                  <span>to</span>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => handleDateChange("end", e.target.value)}
                  />
                </div>

                {/* Search Bar */}
                <div className="payment-dashboard-search-bar">
                  <Search />
                  <input
                    type="text"
                    placeholder="Search by payment ID or name"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="payment-dashboard-table-wrapper">
              <table className="payment-dashboard-table">
                <thead>
                  <tr>
                    <th>Request No.</th>
                    <th>Transaction Id</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.request_number}</td>
                      <td>
                        <span
                          className={`transaction-status ${
                            payment.transaction_id ? "success" : "pending"
                          }`}
                        >
                          {payment.transaction_id
                            ? payment.transaction_id
                            : "N/A"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`amount-badge ${getAmountColorClass(
                            payment.amount
                          )}`}
                        >
                          ₹{payment.amount}
                        </span>
                      </td>
                      <td>{formatDate(payment.updated_at)}</td>
                      <td>
                        <span
                          className={`payment-dashboard-status ${payment.status.toLowerCase()}`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="payment-dashboard-view-btn"
                          onClick={() => handleView(payment.id)}
                        >
                          <Visibility /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentDashboard;
