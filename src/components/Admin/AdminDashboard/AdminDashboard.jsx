import React from 'react'
import './AdminDashboard.css'
import AdminHeader from '../AdminHeader/AdminHeader'
import { Dashboard, People, Description, CheckCircle, Search } from '@mui/icons-material'


const AdminDashboard = () => {
    return (
        <>
            <div className="admin-dashboard">
                <AdminHeader />
                <div className="dashboard-content">
                    <div className="dashboard-stats">
                        <div className="dashboard-stat-card">
                            <Dashboard />
                            <div className="dashboard-stat-info">
                                <h3>Total Requests</h3>
                                <p>125</p>
                            </div>
                        </div>
                        <div className="dashboard-stat-card">
                            <People />
                            <div className="dashboard-stat-info">
                                <h3>Active Users</h3>
                                <p>100</p>
                            </div>
                        </div>
                        <div className="dashboard-stat-card">
                            <Description />
                            <div className="dashboard-stat-info">
                                <h3>In Production</h3>
                                <p>66</p>
                            </div>
                        </div>
                        <div className="dashboard-stat-card">
                            <CheckCircle />
                            <div className="dashboard-stat-info">
                                <h3>Completed</h3>
                                <p>14</p>
                            </div>
                        </div>
                    </div>



                    <div className="dashboard-table-section">
                        <div className="dashboard-table-header">
                            <h2>Recent Requests</h2>
                        </div>
                        <div className="dashboard-search-bar">
                            <Search />
                            
                        </div>
                    </div>


                </div>
            </div>
        </>
    )
}

export default AdminDashboard