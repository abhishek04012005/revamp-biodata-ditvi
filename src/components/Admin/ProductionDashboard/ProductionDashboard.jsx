import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './ProductionDashboard.css'
import { Storage, Description, Search, Visibility } from '@mui/icons-material'

const ProductionDashboard = () => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const productionStats = [
        { icon: <Storage />, title: "Total Request", value: 100 },
        { icon: <Description />, title: "Completed", value: 66 },
        { icon: <Description />, title: "Pending", value: 14 }
    ]

    const dummyData = [
        {
            id: '01',
            name: 'Tony Stark',
            mobile: '9264248504',
            date: '07-02-1999',
            status: 'Completed'
        },
        {
            id: '02',
            name: 'Thor',
            mobile: '9264248504',
            date: '07-02-1999',
            status: 'Completed'
        }

    ];

    return (
        <>
            <div className="production-dashboard">

                <div className="production-dashboard-content">
                    <div className="production-dashboard-stats">
                        {
                            productionStats.map((stat, index) => (
                                <div className="production-dashboard-stat-card" key={index}>
                                    {stat.icon}
                                    <div className="production-dashboard-stat-info">
                                        <h3>{stat.title}</h3>
                                        <p>{stat.value}</p>
                                    </div>
                                </div>
                            ))
                        }
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
                                        <th>Profile</th>
                                        <th>Name</th>
                                        <th>Request No.</th>
                                        <th>Created Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dummyData.map((request) => (
                                        <tr key={request.id}>
                                            <td>{request.name}</td>
                                            <td>{request.mobile}</td>
                                            <td>{request.id}</td>
                                            <td>{request.date}</td>
                                            <td className="production-dashboard-action-buttons">
                                                <Link
                                                    to={`/production/request`}
                                                    className="production-dashboard-action-btn details-btn"
                                                >
                                                    Show Details
                                                </Link>
                                                <Link
                                                    to={`/admin/production/preview`}
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
    )
}

export default ProductionDashboard 