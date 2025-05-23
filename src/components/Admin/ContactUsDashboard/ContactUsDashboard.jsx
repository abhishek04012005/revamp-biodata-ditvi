import React, { useState, useEffect } from "react";
import {
  Delete,
  Refresh,
  Search,
  FilterList,
  Visibility,
  Close,
} from "@mui/icons-material";
import "./ContactUsDashboard.css";
import { ContactUsStorage } from "../../../supabase/ContactUs";
import HeaderSection from "../../../structure/HeaderSection/HeaderSection";

const ContactUsDashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "created_at",
    direction: "desc",
  });
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    contactId: null,
  });

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

  // const handleDelete = async (id) => {
  //   try {
  //     if (window.confirm("Are you sure you want to delete this contact?")) {
  //       await ContactUsStorage.deleteContactUsById(id);
  //       setContacts(contacts.filter((contact) => contact.id !== id));
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  const handleDelete = async () => {
  try {
    await ContactUsStorage.deleteContactUsById(deleteModal.contactId);
    setContacts(contacts.filter((contact) => contact.id !== deleteModal.contactId));
    setDeleteModal({ show: false, contactId: null });
  } catch (error) {
    console.error("Error:", error);
  }
};


  const showDeleteModal = (id) => {
    setDeleteModal({ show: true, contactId: id });
  };

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "asc"
          ? "desc"
          : "asc",
    });
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
    <div className="contact-dashboard">
      <HeaderSection
        title={`Contact Request`}
        subtitle={`Contact Request List`}
      />
      <div className="dashboard-header">
        <button className="refresh-btn" onClick={fetchContacts}>
          <Refresh /> Refresh
        </button>
      </div>

      {/* Modal for Contact Details */}
      {selectedContact && (
        <div
          className="contact-modal-overlay"
          onClick={() => setSelectedContact(null)}
        >
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Contact Details</h2>
              <button
                className="close-btn"
                onClick={() => setSelectedContact(null)}
              >
                <Close />
              </button>
            </div>
            <div className="modal-content">
              <div className="detail-row">
                <span className="detail-label">Number:</span>
                <span className="detail-value">{selectedContact.number}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{selectedContact.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{selectedContact.email}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Mobile:</span>
                <span className="detail-value">{selectedContact.mobile}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span className="detail-value">
                  {new Date(selectedContact.created_at).toLocaleString(
                    "en-US",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </div>
              <div className="detail-row message">
                <span className="detail-label">Message:</span>
                <p className="detail-value message-text">
                  {selectedContact.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End of Modal */}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div
          className="delete-modal-overlay"
          onClick={() => setDeleteModal({ show: false, contactId: null })}
        >
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Confirm Delete</h2>
              <button
                className="close-btn"
                onClick={() => setDeleteModal({ show: false, contactId: null })}
              >
                <Close />
              </button>
            </div>
            <div className="modal-content">
              <p>Are you sure you want to delete this contact?</p>
              <p>This action cannot be undone.</p>
              <div className="modal-actions">
                <button
                  className="cancel-btn"
                  onClick={() =>
                    setDeleteModal({ show: false, contactId: null })
                  }
                >
                  Cancel
                </button>
                <button className="confirm-delete-btn" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-controls">
        <div className="search-box">
          <Search />
          <input
            type="text"
            placeholder="Search by name, email or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading contacts...</p>
        </div>
      ) : (
        <div className="contacts-table-container">
          <table className="contacts-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("name")}>
                  Number <FilterList />
                </th>
                <th onClick={() => handleSort("name")}>
                  Name <FilterList />
                </th>
                <th onClick={() => handleSort("email")}>
                  Email <FilterList />
                </th>
                <th onClick={() => handleSort("phone")}>
                  Mobile <FilterList />
                </th>
                <th>Message</th>
                <th onClick={() => handleSort("created_at")}>
                  Date <FilterList />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="contact-row">
                  <td>{contact.number}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.mobile}</td>
                  <td>
                    <div className="message-cell">{contact.message}</div>
                  </td>
                  <td>
                    {new Date(contact.created_at).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="action-buttons">
                    <button
                      className="view-btn"
                      onClick={() => handleViewDetails(contact)}
                      title="View Details"
                    >
                      <Visibility />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => showDeleteModal(contact.id)}
                      title="Delete"
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContactUsDashboard;
