import React, { useState } from 'react';
import './AdminLogin.css'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const AdminLogin = () => {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="admin-login">
                <div className="admin-login-card">
                    <h2>Admin Login</h2>
                    <div className="admin-login-form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={""}
                            required
                        />
                    </div>
                    <div className="admin-login-form-group">
                        <label>Password:</label>
                        <input
                            type="text"
                            value={""}
                            required
                        />

                        <button
                            type="button"
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0',
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                            Submit
                        </button>

                    </div>

                    <button
                        type="submit"
                        className="admin-login-button"
                       
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </div>
        </>
    )
}

export default AdminLogin