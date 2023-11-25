import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
    let session = sessionStorage.getItem('account');

    return session ? (
        <Outlet />
    ) : (
        <>
            {toast.warning('Please LogIn....')}
            <Navigate to="/" />
        </>
    );
};

export default PrivateRoute;
