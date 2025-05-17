import React from 'react'
import { useNavigate } from 'react-router-dom';
import './AdminHeader.css'
import { Person, Logout } from '@mui/icons-material'
import { useAdmin } from '../AdminContext/AdminContex';

const AdminHeader = () => {
    const navigate = useNavigate();
    const { logoutAdmin, adminData } = useAdmin();

    const handleLogout = () => {
        logoutAdmin();
        navigate('/admin/login');
    }
    
    return (
        <>
            <header className="dashboard-header">
                <div className="dashboard-header-left">
                    <Person className='dashboard-admin-icon' />
                    <div className="dashboard-admin-info">
                        <span className="dashboard-admin-welcome">Welcome,</span>
                        <h2 className='dashboard-admin-name'>
                            {adminData?.name || 'No Admin'}
                        </h2>
                    </div>
                </div>
                <button className="dashboard-logout-btn" onClick={handleLogout}>
                    <Logout />
                    <span>Logout</span>
                </button>
            </header>
        </>
    )
}

export default AdminHeader