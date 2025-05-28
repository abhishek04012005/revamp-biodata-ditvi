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

import "./PaymentTable.css";

export const FilterSection = ({
  searchQuery,
  setSearchQuery,
  dateRange,
  setDateRange,
  filter,
  setFilter,
}) => (
  <div className="filter-section">
    <div className="search-box">
      <Search />
      <input
        type="text"
        placeholder="Search by request number or name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>

    <div className="date-filter">
      <DateRange />
      <input
        type="date"
        value={dateRange.start}
        onChange={(e) =>
          setDateRange((prev) => ({ ...prev, start: e.target.value }))
        }
      />
      <span>to</span>
      <input
        type="date"
        value={dateRange.end}
        onChange={(e) =>
          setDateRange((prev) => ({ ...prev, end: e.target.value }))
        }
      />
    </div>

    <div className="status-filter">
      <FilterList />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All Payments</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="failed">Failed</option>
      </select>
    </div>
  </div>
);

export const PaymentTable = ({ payments, loading }) => (
  <div className="payment-table-container">
    <table className="payment-table">
      <thead>
        <tr>
          <th>Request No.</th>
          <th>User Name</th>
          <th>Amount</th>
          <th>Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td colSpan="6" className="loading-cell">
              Loading payments...
            </td>
          </tr>
        ) : payments.length === 0 ? (
          <tr>
            <td colSpan="6" className="no-data-cell">
              No payments found
            </td>
          </tr>
        ) : (
          payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.request_number}</td>
              <td>{payment.request_biodata?.user_details?.name || "N/A"}</td>
              <td>₹{parseFloat(payment.amount).toLocaleString()}</td>
              <td>{new Date(payment.created_at).toLocaleDateString()}</td>
              <td>
                <span
                  className={`status-badge ${payment.status.toLowerCase()}`}
                >
                  {payment.status}
                </span>
              </td>
              <td>
                <button className="action-btn view">View Details</button>
                <button className="action-btn download">
                  <GetApp /> Receipt
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
