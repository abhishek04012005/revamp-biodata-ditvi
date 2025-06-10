import React, { useState, useEffect } from "react";
import {
  Refresh,
  Search,
  Visibility,
  Close,
  Message,
  Email,
  Phone,
  ContactMail,
  Person,
  AccessTime,
  Reply,
} from "@mui/icons-material";
import "./ContactUsDashboard.css";
import { ContactUsStorage } from "../../../supabase/ContactUs";
import Loader from "../../../structure/Loader/Loader";
import formatDate from "../../../utils/DateHelper";

const ContactUsDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "created_at",
    direction: "desc",
  });

  const stats = [
    {
      icon: <Message />,
      title: "Total Messages",
      value: contacts.length,
      color: "#4CAF50",
    },
    {
      icon: <Email />,
      title: "New Messages",
      value: contacts.filter((c) => !c.isRead).length,
      color: "#2196F3",
    },
    {
      icon: <Phone />,
      title: "Total Calls",
      value: "25",
      color: "#FFC107",
    },
    {
      icon: <ContactMail />,
      title: "Active Queries",
      value: "10",
      color: "#9C27B0",
    },
  ];

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const data = await ContactUsStorage.getAllContactUs();
      setContacts(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (contact) => {
    setSelectedContact(contact);
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
    }
    return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
  });

  const filteredContacts = sortedContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {isLoading && <Loader />}
      <div className="contact-dashboard">
        <div className="contact-dashboard-content">
          <div className="contact-dashboard-stats">
            {stats.map((stat, index) => (
              <div className="contact-dashboard-stat-card" key={index}>
                <div
                  className="contact-dashboard-stat-icon"
                  // style={{ backgroundColor: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="contact-dashboard-stat-info">
                  <h3>{stat.title}</h3>
                  <p>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-dashboard-table-section">
            <div className="contact-dashboard-table-header">
              <h2>Contact Messages</h2>
              <div className="contact-dashboard-actions">
                <div className="contact-dashboard-search-bar">
                  <Search />
                  <input
                    type="text"
                    placeholder="Search by name, email or message..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button
                  className="contact-dashboard-refresh-btn"
                  onClick={fetchContacts}
                >
                  <Refresh /> Refresh
                </button>
              </div>
            </div>

            <div className="contact-dashboard-table-wrapper">
              <table className="contact-dashboard-table">
                <thead>
                  <tr>
                    <th>Serial No. </th>
                    <th>Name </th>
                    <th>Email </th>
                    <th>Whatsapp Number </th>
                    <th>Message</th>
                    <th>Date </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.number}</td>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                      <td>{contact.mobile}</td>
                      <td>
                        <div className="message-preview">
                          {contact.message.substring(0, 50)}...
                        </div>
                      </td>
                      <td>{formatDate(contact.created_at)}</td>
                      <td className="contact-dashboard-actions">
                        <button
                          className="contact-dashboard-view-btn"
                          onClick={() => handleViewDetails(contact)}
                          title="View Details"
                        >
                          <Visibility />
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

      {selectedContact && (
        <div
          className="contact-dashboard-modal-overlay"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="contact-dashboard-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="contact-dashboard-modal-header">
              <div className="modal-title">
                <ContactMail
                  sx={{ color: "var(--primary-color)", fontSize: 28 }}
                />
                <h2>Contact Details</h2>
              </div>
              <button
                className="contact-dashboard-modal-close"
                onClick={() => setSelectedContact(null)}
                aria-label="Close modal"
              >
                <Close />
              </button>
            </div>

            <div className="contact-dashboard-modal-content">
              <div className="contact-info-grid">
                <div className="contact-info-item">
                  <div className="info-label">
                    <span className="label-icon">#</span>
                    <span>Serial Number</span>
                  </div>
                  <div className="info-value highlight">
                    {selectedContact.number}
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="info-label">
                    <span>Full Name</span>
                  </div>
                  <div className="info-value">{selectedContact.name}</div>
                </div>

                <div className="contact-info-item">
                  <div className="info-label">
                    <span>Whatsapp Number</span>
                  </div>
                  <div className="info-value">
                    <div className="info-value highlight">
                      {selectedContact.mobile}
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="info-label">
                    <span>Submission Date & Time</span>
                  </div>
                  <div className="info-value">
                    {formatDate(selectedContact.created_at)}
                  </div>
                </div>
              </div>

              <div className="message-section">
                <div className="message-header">
                  <h3>Message Content</h3>
                </div>
                <div className="message-content">
                  <p>{selectedContact.message}</p>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="action-btn close-btn"
                  onClick={() => setSelectedContact(null)}
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

export default ContactUsDashboard;
