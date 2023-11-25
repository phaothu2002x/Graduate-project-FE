import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '~/context/UserContext';
const PrivateRoute = () => {
    const { user } = useContext(UserContext);

    return user && user.isAuthenticated ? (
        <Outlet />
    ) : (
        <>
            {toast.warning('Please LogIn....')}
            <Navigate to="/" />
        </>
    );
};

export default PrivateRoute;
