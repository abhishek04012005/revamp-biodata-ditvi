import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [adminData, setAdminData] = useState(null);


    useEffect(() => {
        // Check admin session on load
        checkAdminSession();
    }, []);

    const checkAdminSession = async () => {
        const session = localStorage.getItem('adminSession');
        if (session) {
            setIsAdmin(true);
        }
        setLoading(false);
    };


    const loginAdmin = (data) => {
        localStorage.setItem('adminSession', 'true');
        localStorage.setItem('adminData', JSON.stringify(data));
        setIsAdmin(true);
        setAdminData(data);
    }

    const logoutAdmin = () => {
        localStorage.removeItem('adminSession');
        localStorage.removeItem('adminData');
        setIsAdmin(false);
        setAdminData(null);
    };
    

    return (
        <AdminContext.Provider value={{ isAdmin, adminData, loading, loginAdmin, logoutAdmin }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};