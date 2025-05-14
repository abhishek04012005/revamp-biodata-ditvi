import React, { useState } from 'react';
import './AdminDashboard.css';
import AdminHeader from '../AdminHeader/AdminHeader';
import {
    Dashboard,
    People,
    Description,
    CheckCircle,
    Search,
    ArrowBack,
    ArrowForward,
    Delete
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const stats = [
        { icon: <Dashboard />, title: "Total Requests", value: 125 },
        { icon: <People />, title: "Active Users", value: 100 },
        { icon: <Description />, title: "In Production", value: 66 },
        { icon: <CheckCircle />, title: "Completed", value: 14 }
    ];

    const dummyData = [
        {
            id: '01',
            name: 'Tony Stark',
            mobile: '9264248504',
            date: '07-02-1999',
            status: 'Completed'
        }

    ];

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusChange = (direction, id) => {

        console.log(`Status ${direction} for ID: ${id}`);
    };

    const handleDelete = (id) => {

        console.log(`Deleting request ID: ${id}`);
    };

    return (
        <div className="admin-dashboard">
            <AdminHeader />
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
                                placeholder="Search by name or request no."
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
                                {dummyData.map((request) => (
                                    <tr key={request.id}>
                                        <td>{request.id}</td>
                                        <td>{request.name}</td>
                                        <td>{request.mobile}</td>
                                        <td>{request.date}</td>
                                        <td>{request.status}</td>
                                        <td className="dashboard-status-actions">
                                            <button
                                                className="dashboard-action-btn backward"
                                                onClick={() => handleStatusChange('backward', request.id)}
                                            >
                                                <ArrowBack />
                                            </button>
                                            <button
                                                className="dashboard-action-btn forward"
                                                onClick={() => handleStatusChange('forward', request.id)}
                                            >
                                                <ArrowForward />
                                            </button>
                                        </td>
                                        <td>
                                            <Link
                                                to={`/request/${request.id}`}
                                                className="dashboard-view-btn"
                                            >
                                                Preview
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
    );
};

export default AdminDashboard;