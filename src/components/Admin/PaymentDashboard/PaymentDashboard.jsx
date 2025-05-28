import React, { useState, useEffect } from "react";
import {
  Payment,
  AccountBalance,
  DateRange,
  AttachMoney,
  Person,
  Receipt,
  Search,
  FilterList,
  GetApp,
} from "@mui/icons-material";
import { PaymentRequestStorage } from "../../../supabase/PaymentRequest";
import "./PaymentDashboard.css";
import { PaymentStatus } from "../../../json/PaymentStatus";
import { PaymentTable, FilterSection } from "./Sections/PaymentTable";

const PaymentDashboard = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [summaryStats, setSummaryStats] = useState({
    totalRevenue: 0,
    pendingPayments: 0,
    completedPayments: 0,
    totalUsers: 0,
  });
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setMonth(new Date().getMonth() - 1))
      .toISOString()
      .split("T")[0],
    end: new Date().toISOString().split("T")[0],
  });

  const calculateSummaryStats = (paymentsData) => {
    const stats = {
      totalRevenue: 0,
      pendingPayments: 0,
      completedPayments: 0,
      totalUsers: new Set(),
    };

    paymentsData.forEach((payment) => {
      if (payment.status === PaymentStatus.Completed) {
        stats.totalRevenue += parseFloat(payment.amount);
        stats.completedPayments++;
      }
      if (payment.status === PaymentStatus.Pending) {
        stats.pendingPayments++;
      }
      if (payment.request_biodata?.user_details?.id) {
        stats.totalUsers.add(payment.request_biodata.user_details.id);
      }
    });

    setSummaryStats({
      totalRevenue: stats.totalRevenue,
      pendingPayments: stats.pendingPayments,
      completedPayments: stats.completedPayments,
      totalUsers: stats.totalUsers.size,
    });
  };

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const data = await PaymentRequestStorage.getAllPayments({
        startDate: dateRange.start,
        endDate: dateRange.end,
        status: filter !== "all" ? filter : null,
        searchQuery: searchQuery,
      });
      setPayments(data);
      calculateSummaryStats(data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      // You can add a toast notification here
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [dateRange.start, dateRange.end, filter, searchQuery]);

  const handleExportData = () => {
    const csvContent = [
      ["Request No.", "User Name", "Amount", "Date", "Status"],
      ...payments.map((payment) => [
        payment.request_number,
        payment.request_biodata?.user_details?.name,
        payment.amount,
        new Date(payment.created_at).toLocaleDateString(),
        payment.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payments-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const summaryData = {
    totalRevenue: {
      title: "Total Revenue",
      value: `₹${summaryStats.totalRevenue.toLocaleString()}`,
      icon: <AttachMoney />,
      color: "#4CAF50",
    },
    pendingPayments: {
      title: "Pending Payments",
      value: summaryStats.pendingPayments,
      icon: <Payment />,
      color: "#FFC107",
    },
    completedPayments: {
      title: "Completed Payments",
      value: summaryStats.completedPayments,
      icon: <Receipt />,
      color: "#2196F3",
    },
    totalUsers: {
      title: "Total Users",
      value: summaryStats.totalUsers,
      icon: <Person />,
      color: "#9C27B0",
    },
  };

  // ... Rest of your component code (SummaryCard, FilterSection, PaymentTable) ...

  return (
    <div className="payment-dashboard">
      <header className="dashboard-header">
        <h1>
          <AccountBalance /> Payment Dashboard
        </h1>
        <button className="export-btn" onClick={handleExportData}>
          <GetApp /> Export Data
        </button>
      </header>

      <div className="summary-section">
        {Object.values(summaryData).map((data, index) => (
          <SummaryCard key={index} data={data} />
        ))}
      </div>

      <div className="main-content">
        <FilterSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          dateRange={dateRange}
          setDateRange={setDateRange}
          filter={filter}
          setFilter={setFilter}
        />
        <PaymentTable payments={payments} loading={loading} />
      </div>
    </div>
  );
};

const SummaryCard = ({ data }) => (
  <div className="summary-card" style={{ borderColor: data.color }}>
    <div className="card-icon" style={{ backgroundColor: data.color }}>
      {data.icon}
    </div>
    <div className="card-content">
      <h3>{data.title}</h3>
      <p className="card-value">{data.value}</p>
    </div>
    <div
      className="card-overlay"
      style={{ backgroundColor: `${data.color}10` }}
    />
  </div>
);

export default PaymentDashboard;
