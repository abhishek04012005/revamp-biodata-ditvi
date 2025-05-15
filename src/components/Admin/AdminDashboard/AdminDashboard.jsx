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

    const isBackwardDisabled = (statusLevel) => statusLevel === 1;
    const isForwardDisabled = (statusLevel) => statusLevel === 5;

    const STATUS_CONFIG = {
        1: { label: 'New Request', color: '#FF870F' },
        2: { label: 'In Progress', color: '#2196F3' },
        3: { label: 'In Production', color: '#9C27B0' },
        4: { label: 'Quality Check', color: '#FF9800' },
        5: { label: 'Completed', color: '#4CAF50' }
    };

    const [requests, setRequests] = useState([
        {
            id: '01',
            name: 'Tony Stark',
            mobile: '9264248504',
            date: '07-02-1999',
            statusLevel: 1
        },
        {
            id: '02',
            name: ' Stark',
            mobile: '9264248504',
            date: '07-02-1999',
            statusLevel: 1
        }
    ]);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };


    const handleStatusChange = (direction, id) => {
        setRequests(prevData =>
            prevData.map(request => {
                if (request.id === id) {
                    let newStatus;
                    if (direction === 'forward') {
                        newStatus = request.statusLevel + 1;
                        if (newStatus > 5) newStatus = 1;
                    } else {
                        newStatus = request.statusLevel - 1;
                        if (newStatus < 1) newStatus = 5;
                    }
                    return { ...request, statusLevel: newStatus };
                }
                return request;
            })
        );
    };

    const getStatusStyle = (statusLevel) => ({
        backgroundColor: `${STATUS_CONFIG[statusLevel].color}20`,
        color: STATUS_CONFIG[statusLevel].color,
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        fontWeight: '500',
        fontSize: '0.9rem',
        display: 'inline-block'
    });

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
                                {requests.map((request) => (
                                    <tr key={request.id}>
                                        <td>{request.id}</td>
                                        <td>{request.name}</td>
                                        <td>{request.mobile}</td>
                                        <td>{request.date}</td>
                                        <td>
                                            <span style={getStatusStyle(request.statusLevel)}>
                                                {STATUS_CONFIG[request.statusLevel].label}
                                            </span>
                                        </td>
                                        <td className="dashboard-status-actions">
                                            <button
                                                className="dashboard-action-btn backward"
                                                onClick={() => handleStatusChange('backward', request.id)}
                                                disabled={isBackwardDisabled(request.statusLevel)}
                                            >
                                                <ArrowBack />
                                            </button>
                                            <button
                                                className="dashboard-action-btn forward"
                                                onClick={() => handleStatusChange('forward', request.id)}
                                                disabled={isForwardDisabled(request.statusLevel)}
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