import React, { useState, useEffect } from "react";
import {
  Refresh,
  Search,
  ContactPhone,
  Person,
  Email,
  WhatsApp,
  AccessTime,
  Campaign
} from "@mui/icons-material";
import "./LeadDashboard.css";
import { UserDetailsStorage } from "../../../supabase/UserDetails";
import Loader from "../../../structure/Loader/Loader";
import { maskMobileNumber } from "../../../utils/MobileNumberHelper";
import { BiodataRequestStorage } from "../../../supabase/BiodataRequest";
import formatDate from "../../../utils/DateHelper";

const LeadDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
      value: leads.filter(lead => lead.mobileNumber).length,
      color: "#2196F3",
    },
    {
      icon: <Email />,
      title: "Email Available",
      value: leads.filter(lead => lead.email).length,
      color: "#FFC107",
    }
  ];

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const users = await UserDetailsStorage.getAllUsers();
      const requests = await BiodataRequestStorage.getAllBiodataRequestWithoutAnyFilters();

      const potentialLeads = users.filter(user => 
      !requests.some(request => 
        request.user_details?.mobileNumber === user.user_details?.mobileNumber
      )
    );

    console.log('potentialLeads', potentialLeads);

    setLeads(potentialLeads);
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setIsLoading(false);
    }
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
      lead.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.mobileNumber?.includes(searchTerm)
  );

  return (
    <>
      {isLoading && <Loader />}
      <div className="lead-dashboard">
        <div className="lead-dashboard-content">
          <div className="lead-dashboard-stats">
            {stats.map((stat, index) => (
              <div className="lead-dashboard-stat-card" key={index}>
                <div className="lead-dashboard-stat-icon">
                  {stat.icon}
                </div>
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
                    <th>Name</th>
                    {/* <th>Email</th> */}
                    <th>Mobile</th>
                    <th>Registration Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>{lead.user_details?.name}</td>
                      {/* <td>{lead.user_details?.email || "N/A"}</td> */}
                      <td>{lead.user_details?.mobileNumber}</td>
                      <td>
                        {formatDate(lead.created_at)}
                      </td>
                      <td>
                        {lead.user_details?.mobileNumber && (
                          <button
                            className="whatsapp-btn"
                            onClick={() => handleWhatsAppClick(lead.user_details?.mobileNumber)}
                          >
                            <WhatsApp /> Contact
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
    </>
  );
};

export default LeadDashboard;