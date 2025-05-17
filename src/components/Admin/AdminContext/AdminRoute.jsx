import { Navigate } from 'react-router-dom';
import { useAdmin } from '../AdminContext/AdminContex';

const AdminRoute = ({ children }) => {
    
    const { isAdmin, loading } = useAdmin();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAdmin) {
        return <Navigate to="/admin/login" />;
    }

    return children;
};

export default AdminRoute;