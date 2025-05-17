import React, { useEffect, useState } from 'react';
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
import { BiodataRequestsStorage } from '../../../supabase/BiodataRequests';
import formatDate from '../../../utils/DateHelper';
import { getLatestStatusId, getLatestStatusText, getStatusStyle } from '../../../utils/StatusHelper';
import { MOVE_BACKWARD, MOVE_FORWARD } from '../../../constants/StatusSteps';
import { getFlowTypeById } from '../../../constants/FlowType';

const AdminDashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [requests, setRequests] = useState([]);
    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await BiodataRequestsStorage.getAllBiodataRequest();
            if (response) {
                setRequests(response);
            } else {
                console.error('No requests found');
            }
        }
        catch (error) {
            console.error('Error fetching requests:', error);
        }
    }

    const stats = [
        { icon: <Dashboard />, title: "Total Requests", value: requests.length },
        { icon: <People />, title: "Active Users", value: 100 },
        { icon: <Description />, title: "In Production", value: 66 },
        { icon: <CheckCircle />, title: "Completed", value: 14 }
    ];

    const isBackwardDisabled = (statusId) => [0, 1].includes(statusId);
    const isForwardDisabled = (statusId) => statusId === 4;

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };


    const handleStatusChange = async (direction, requestId) => {
        const request = requests.find(r => r.id === requestId);
        if (!request) return;

        const currentStatusArray = request.status || [];
        direction === MOVE_FORWARD
            ? currentStatusArray.push({ id: getLatestStatusId(currentStatusArray) + 1, created: new Date().toISOString() })
            : currentStatusArray.length && currentStatusArray.pop();
        await BiodataRequestsStorage.updateStatusBiodataRequestById(requestId, currentStatusArray);
        fetchRequests();
    };

    const handleDelete = async (id) => {
        await BiodataRequestsStorage.deleteBiodataRequestById(id);
        fetchRequests();
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
                                {requests.map((request) => (
                                    <tr key={request.id}>
                                        <td>{request.request_number}</td>
                                        <td>{getFlowTypeById(request.flow_type)}</td>
                                        <td>{request.user_details?.name}</td>
                                        <td>{request.user_details?.mobileNumber}</td>
                                        <td>{formatDate(request.created_at)}</td>

                                        <td>
                                            <span style={getStatusStyle(getLatestStatusId(request.status))}>
                                                {getLatestStatusText(request.status)}
                                            </span>
                                        </td>
                                        <td className="dashboard-status-actions">
                                            <button
                                                className="dashboard-action-btn backward"
                                                onClick={() => handleStatusChange(MOVE_BACKWARD, request.id)}
                                                disabled={isBackwardDisabled(getLatestStatusId(request.status))}
                                            >
                                                <ArrowBack />
                                            </button>
                                            <button
                                                className="dashboard-action-btn forward"
                                                onClick={() => handleStatusChange(MOVE_FORWARD, request.id)}
                                                disabled={isForwardDisabled(getLatestStatusId(request.status))}
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