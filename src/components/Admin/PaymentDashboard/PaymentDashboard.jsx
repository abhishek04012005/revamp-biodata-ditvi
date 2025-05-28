import React, { useState, useEffect } from "react";
import {
  AccountBalance,
  AttachMoney,
  Receipt,
  Search,
  DateRange,
  Person,
  Download,
  Visibility,
} from "@mui/icons-material";
import "./PaymentDashboard.css";
import { PaymentRequestStorage } from "../../../supabase/PaymentRequest";
import formatDate from "../../../utils/DateHelper";
import Loader from "../../../structure/Loader/Loader";

const PaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });

  const stats = [
    {
      icon: <AttachMoney />,
      title: "Total Revenue",
      value: "₹50,000",
      color: "#4CAF50",
    },
    {
      icon: <Receipt />,
      title: "Total Payments",
      value: payments.length,
      color: "#2196F3",
    },
    {
      icon: <AccountBalance />,
      title: "Pending Payments",
      value: "25",
      color: "#FFC107",
    },
    {
      icon: <Person />,
      title: "Active Users",
      value: "100",
      color: "#9C27B0",
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
                      <td>₹{payment.amount}</td>
                      <td>{formatDate(payment.updated_at)}</td>
                      <td>
                        <span
                          className={`payment-dashboard-status ${payment.status}`}
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
