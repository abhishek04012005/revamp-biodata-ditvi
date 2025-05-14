import React from 'react'
import './AdminHeader.css'
import { Person, Logout } from '@mui/icons-material'

const AdminHeader = () => {
    return (
        <>
            <header className="dashboard-header">
                <div className="dashboard-header-left">
                    <Person className='dashboard-admin-icon' />
                    <div className="dashboard-admin-info">
                        <span className="dashboard-admin-welcome">Welcome,</span>
                        <h2 className='dashboard-admin-name'>
                            User123
                        </h2>
                    </div>
                </div>
                <button className="dashboard-logout-btn">
                    <Logout />
                    <span>Logout</span>
                </button>
            </header>
        </>
    )
}

export default AdminHeader