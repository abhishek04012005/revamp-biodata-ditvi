import React, { useEffect, useState, useCallback } from "react";
import "./BiodataDashboard.css";
import {
  Dashboard,
  FiberNew,
  Description,
  CheckCircle,
  Search,
  ArrowBack,
  ArrowForward,
  Delete,
  PendingActions,
  Payment,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { BiodataRequestStorage } from "../../../supabase/BiodataRequest";
import formatDate from "../../../utils/DateHelper";
import {
  getLatestStatusId,
  getLatestStatusText,
  getStatusStyle,
} from "../../../utils/StatusHelper";
import { MOVE_BACKWARD, MOVE_FORWARD } from "../../../constants/StatusSteps";
import { getFlowTypeById, getFlowTypeStyle } from "../../../constants/FlowType";
import { ProductionRequestStorage } from "../../../supabase/ProductionRequest";
import Loader from "../../../structure/Loader/Loader";

const BiodataDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await BiodataRequestStorage.getAllBiodataRequest();
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

  const stats = [
    { icon: <Dashboard />, title: "Total Requests", value: requests.length },
    {
      icon: <CheckCircle />,
      title: "Completed",
      value:
        requests.filter((request) => request?.completed === true).length || 0,
    },
    {
      icon: <Description />,
      title: "In Production",
      value: requests.filter(
        (request) =>
          getLatestStatusId(request?.status) > 0 && request?.completed === false
      ).length,
    },
    {
      icon: <FiberNew />,
      title: "New Requests",
      value: requests.filter(
        (request) => getLatestStatusId(request.status) === 0
      ).length,
    },
    {
      icon: <PendingActions />,
      title: "Pending User Approval",
      value: requests.filter(
        (request) => getLatestStatusId(request?.status) === 2
      ).length,
      color: "#FF9800", // Orange color for pending
    },
    {
      icon: <Payment />,
      title: "Payment to Collect",
      value: requests.filter(
        (request) => getLatestStatusId(request?.status) === 3
      ).length,
      color: "#F44336", // Red color for payment pending
    },
  ];

  const isBackwardDisabled = (statusId) => [0, 1].includes(statusId);
  const isForwardDisabled = (statusId) => statusId === 5;

  const handleSearch = (e) => {
    const searchValue = e.target.value;
    try {
      const value = searchValue.trim();

      if (!value) {
        fetchRequests(); // Reset to all records if search is empty
        return;
      }

      // Convert search value to number for comparison
      const searchNumber = parseInt(value);

      if (isNaN(searchNumber)) {
        setRequests([]); // Clear results if not a number
        return;
      }

      // Filter existing requests by request_number
      const filteredRequests = requests.filter((request) =>
        request.request_number.toString().includes(value)
      );

      if (filteredRequests.length > 0) {
        setRequests(filteredRequests);
      } else {
        alert("No records found.");
      }
    } catch (error) {
      console.error("Error filtering requests:", error);
    }
  };

  const moveToProduction = async (request) => {
    try {
      const response = await ProductionRequestStorage.saveProductionRequest({
        biodataRequestId: request.id,
        requestNumber: request.request_number,
        flowType: request.flow_type,
        userDetails: request.user_details,
        modelDetails: request.model_details,
        profileUrl: request.profile_url,
        biodataUrl: request.biodata_url,
        personalDetails: request.personal_details,
        professionalDetails: request.professional_details,
        examinationDetails: request.examination_details,
        educationDetails: request.education_details,
        familyDetails: request.family_details,
        contactDetails: request.contact_details,
      });
    } catch (error) {
      console.error("Error getAllBiodataRequest:", error);
      throw error;
    }
  };

  const handleStatusChange = async (direction, requestId) => {
    try {
      setIsLoading(true);
      const request = requests.find((r) => r.id === requestId);
      if (!request) return;

      const currentStatusArray = request.status || [];
      const latestStatusId = getLatestStatusId(currentStatusArray);

      if (latestStatusId === 0) moveToProduction(request);

      direction === MOVE_FORWARD
        ? currentStatusArray.push({
            id: latestStatusId + 1,
            created: new Date().toISOString(),
          })
        : currentStatusArray.length && currentStatusArray.pop();
      await BiodataRequestStorage.updateStatusBiodataRequestById(
        requestId,
        currentStatusArray
      );
      fetchRequests();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      await BiodataRequestStorage.deleteBiodataRequestById(id);
      fetchRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="admin-dashboard">
        <div className="dashboard-content">
          <div className="dashboard-stats">
            {stats.map((stat, index) => (
              <div className="dashboard-stat-card" key={index}>
                {stat.icon}
                <div className="dashboard-stat-info">
                  <h3>{stat.title}</h3>
                  <p>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="dashboard-table-section">
            <div className="dashboard-table-header">
              <h2>Recent Requests</h2>
              <div className="dashboard-search-bar">
                <Search />
                <input
                  type="text"
                  placeholder="Search by Request No. or Mobile No."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
            </div>

            <div className="dashboard-table-container">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Request No.</th>
                    <th>Flow Type</th>
                    <th>Name</th>
                    <th>Mobile Number</th>
                    <th>Created Date</th>
                    <th>Status</th>
                    <th>Status Action</th>
                    <th>Preview</th>
                    <th>Delete</th>
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

                        <td>
                          <span
                            style={getStatusStyle(
                              getLatestStatusId(request.status)
                            )}
                          >
                            {getLatestStatusText(request.status)}
                          </span>
                        </td>
                        <td className="dashboard-status-actions">
                          <button
                            className="dashboard-action-btn backward"
                            onClick={() =>
                              handleStatusChange(MOVE_BACKWARD, request.id)
                            }
                            disabled={isBackwardDisabled(
                              getLatestStatusId(request.status)
                            )}
                          >
                            <ArrowBack />
                          </button>
                          <button
                            className="dashboard-action-btn forward"
                            onClick={() =>
                              handleStatusChange(MOVE_FORWARD, request.id)
                            }
                            disabled={isForwardDisabled(
                              getLatestStatusId(request.status)
                            )}
                          >
                            <ArrowForward />
                          </button>
                        </td>
                        <td>
                          <Link
                            to={`/admin/biodata/${request.id}`}
                            className="dashboard-view-btn"
                          >
                            View
                          </Link>
                        </td>
                        <td>
                          <button
                            className="dashboard-delete-btn"
                            onClick={() => handleDelete(request.id)}
                          >
                            <Delete />
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

export default BiodataDashboard;
