import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProductionDashboard.css";
import {
  Dashboard,
  CheckCircle,
  Description,
  Search,
  Visibility,
} from "@mui/icons-material";
import { ProductionRequestStorage } from "../../../supabase/ProductionRequest";
import { getFlowTypeById, getFlowTypeStyle } from "../../../constants/FlowType";
import formatDate from "../../../utils/DateHelper";
import Loader from "../../../structure/Loader/Loader";
import { getLatestStatusId } from "../../../utils/StatusHelper";

const ProductionDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await ProductionRequestStorage.getAllProductionRequest();
      if (response) {
        setRequests(response);
      } else {
        console.error("No requests found");
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const productionStats = [
    { icon: <Dashboard />, title: "Total Requests", value: requests.length },
    {
      icon: <Description />,
      title: "In Progress",
      value: requests.filter((request) => request?.completed === false).length,
    },
    {
      icon: <CheckCircle />,
      title: "Completed",
      value: requests.filter((request) => request?.completed === true).length,
    },
  ];

  return (
    <>
      {isLoading && <Loader />}
      <div className="production-dashboard">
        <div className="production-dashboard-content">
          <div className="production-dashboard-stats">
            {productionStats.map((stat, index) => (
              <div className="production-dashboard-stat-card" key={index}>
                {stat.icon}
                <div className="production-dashboard-stat-info">
                  <h3>{stat.title}</h3>
                  <p>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="production-dashboard-table-section">
            <div className="production-dashboard-table-header">
              <h2>Production Queue</h2>
              <div className="production-dashboard-search-bar">
                <Search />
                <input
                  type="text"
                  placeholder="Search by name or request no."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="production-dashboard-table-container">
              <table className="production-dashboard-table">
                <thead>
                  <tr>
                    <th>Request No.</th>
                    <th>Flow Type</th>
                    <th>Name</th>
                    <th>Mobile Number</th>
                    <th>Created Date</th>
                    <th>Detail</th>
                    <th>Preview</th>
                  </tr>
                </thead>
                <tbody>
                  {requests
                    .filter((request) => request.completed === false)
                    .map((request) => (
                      <tr key={request.id}>
                        <td>{request.request_number}</td>
                        <td>
                          <span style={getFlowTypeStyle(request.flow_type)}>
                            {getFlowTypeById(request.flow_type)}
                          </span>
                        </td>
                        <td>{request.user_details?.name}</td>
                        <td>{request.user_details?.mobileNumber}</td>
                        <td>{formatDate(request.created_at)}</td>
                        <td className="production-dashboard-action-buttons">
                          <Link
                            to={`/admin/production/${request.id}`}
                            className="production-dashboard-action-btn details-btn"
                          >
                            Show Details
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/admin/production/preview/${request.id}`}
                            className="production-dashboard-action-btn preview-btn"
                          >
                            <Visibility />
                            Preview
                          </Link>
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

export default ProductionDashboard;
