import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';
import useAdmin from '../../Hooks/useAdmin';
import Loading from '../../Pages/Shared/Loading/Loading';

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [isAdmin, isLoading] = useAdmin(user?.email)

    const location = useLocation()

    if (loading || isLoading) {
        return <Loading />
    }

    if (user && isAdmin) {
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace />
};

export default AdminRoute;