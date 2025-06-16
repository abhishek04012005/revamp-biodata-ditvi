import React, { useState, useEffect } from "react";
import {
  Refresh,
  Search,
  Person,
  Email,
  WhatsApp,
  AccessTime,
  Campaign,
  Visibility,
  Close,
  Description,
} from "@mui/icons-material";
import "./LeadDashboard.css";
import { UserDetailsStorage } from "../../../supabase/UserDetails";
import Loader from "../../../structure/Loader/Loader";
import { BiodataRequestStorage } from "../../../supabase/BiodataRequest";
import formatDate from "../../../utils/DateHelper";

const LeadDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLead, setSelectedLead] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "created_at",
    direction: "desc",
  });

  const stats = [
    {
      icon: <Campaign />,
      title: "Total Leads",
      value: leads.length,
      color: "#4CAF50",
    },
    {
      icon: <WhatsApp />,
      title: "WhatsApp Available",
      value: leads.filter((lead) => lead.user_details?.mobileNumber).length,
      color: "#2196F3",
    },
    {
      icon: <Email />,
      title: "Email Available",
      value: leads.filter((lead) => lead.user_details?.email).length,
      color: "#FFC107",
    },
    {
      icon: <Person />,
      title: "New Leads",
      value: leads.filter((lead) => {
        const date = new Date(lead.created_at);
        const now = new Date();
        return now - date < 24 * 60 * 60 * 1000;
      }).length,
      color: "#9C27B0",
    },
  ];

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const users = await UserDetailsStorage.getAllUsers();
      const requests =
        await BiodataRequestStorage.getAllBiodataRequestWithoutAnyFilters();

      const potentialLeads = users.filter(
        (user) =>
          !requests.some(
            (request) =>
              request.user_details?.mobileNumber ===
              user.user_details?.mobileNumber
          )
      );

      setLeads(potentialLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (lead) => {
    setSelectedLead(lead);
  };

  const handleWhatsAppClick = (mobileNumber) => {
    const message = encodeURIComponent(
      "Hello! We noticed you're interested in our biodata services. How may we assist you today?"
    );
    window.open(`https://wa.me/91${mobileNumber}?text=${message}`, "_blank");
  };

  const sortedLeads = [...leads].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const filteredLeads = sortedLeads.filter(
    (lead) =>
      lead.user_details?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      lead.user_details?.email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      lead.user_details?.mobileNumber?.includes(searchTerm)
  );

  return (
    <>
      {isLoading && <Loader />}
      <div className="lead-dashboard">
        <div className="lead-dashboard-content">
          <div className="lead-dashboard-stats">
            {stats.map((stat, index) => (
              <div className="lead-dashboard-stat-card" key={index}>
                <div className="lead-dashboard-stat-icon">{stat.icon}</div>
                <div className="lead-dashboard-stat-info">
                  <h3>{stat.title}</h3>
                  <p>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lead-dashboard-table-section">
            <div className="lead-dashboard-table-header">
              <h2>Potential Leads</h2>
              <div className="lead-dashboard-actions">
                <div className="lead-dashboard-search-bar">
                  <Search />
                  <input
                    type="text"
                    placeholder="Search by name, email or mobile..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="lead-dashboard-refresh-btn"
                  onClick={fetchLeads}
                >
                  <Refresh /> Refresh
                </button>
              </div>
            </div>

            <div className="lead-dashboard-table-wrapper">
              <table className="lead-dashboard-table">
                <thead>
                  <tr>
                    <th>Request No.</th>
                    <th>Biodata Model No.</th>
                    <th>Name</th>
                    <th>Whatsapp Number</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id}>
                      {console.log("Lead", lead)}

                      <td>{lead.request_number}</td>
                      <td>{lead.model_details?.modelNumber || "N/A"}</td>

                      <td>{lead.user_details?.name}</td>
                      <td>{lead.user_details?.mobileNumber}</td>
                      <td>{formatDate(lead.created_at)}</td>
                      <td>
                        <button
                          className="lead-dashboard-view-btn"
                          onClick={() => handleViewDetails(lead)}
                          title="View Details"
                        >
                          <Visibility />
                        </button>
                        {lead.user_details?.mobileNumber && (
                          <button
                            className="leads-whatsapp-btn"
                            onClick={() =>
                              handleWhatsAppClick(
                                lead.user_details?.mobileNumber
                              )
                            }
                            title="Contact on WhatsApp"
                          >
                            <WhatsApp />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedLead && (
        <div
          className="lead-dashboard-modal-overlay"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="lead-dashboard-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="lead-dashboard-modal-header">
              <div className="modal-title">
                <Person sx={{ color: "var(--primary-color)", fontSize: 28 }} />
                <h2>Lead Details</h2>
              </div>
              <button
                className="lead-dashboard-modal-close"
                onClick={() => setSelectedLead(null)}
                aria-label="Close modal"
              >
                <Close />
              </button>
            </div>

            <div className="lead-dashboard-modal-content">
              <div className="lead-info-grid">
                <div className="lead-info-item">
                  <div className="info-label">
                    <Person className="label-icon" />
                    <span>Full Name</span>
                  </div>
                  <div className="info-value">
                    {selectedLead.user_details?.name}
                  </div>
                </div>

                <div className="lead-info-item">
                  <div className="info-label">
                    <Description className="label-icon" />
                    <span>Biodata Model No.</span>
                  </div>
                  <div className="info-value">
                    {selectedLead.model_details?.modelNumber || "N/A"}
                  </div>
                </div>

                <div className="lead-info-item">
                  <div className="info-label">
                    <WhatsApp className="label-icon" />
                    <span>WhatsApp Number</span>
                  </div>
                  <div className="info-value">
                    {selectedLead.user_details?.mobileNumber}
                  </div>
                </div>

                <div className="lead-info-item">
                  <div className="info-label">
                    <AccessTime className="label-icon" />
                    <span>Registration Date</span>
                  </div>
                  <div className="info-value">
                    {new Date(selectedLead.created_at).toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="lead-action-btn lead-whatsapp-btn"
                  onClick={() =>
                    handleWhatsAppClick(selectedLead.user_details?.mobileNumber)
                  }
                >
                  <WhatsApp /> Contact on WhatsApp
                </button>
                <button
                  className="lead-action-btn lead-close-btn"
                  onClick={() => setSelectedLead(null)}
                >
                  <Close /> Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LeadDashboard;
