import { useContext, useState } from 'react';
import './AdminNav.scss';
import { logoutUser } from '~/services/userService';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '~/context/UserContext';
import { toast } from 'react-toastify';
const AdminNavbar = (props) => {
    const navigate = useNavigate();
    const { user, logoutContext } = useContext(UserContext);

    const [isNavOpen, setIsNavOpen] = useState(true);

    const handleShowAdmin = () => {
        setIsNavOpen(!isNavOpen);
    };

    const handleLogout = async () => {
        localStorage.removeItem('jwt'); //clear local storage
        logoutContext(); //clear userContext
        let response = await logoutUser(); //clear cookies
        if (response && +response.EC === 0) {
            toast.success(response.EM);
            navigate('/');
        } else {
            toast.error('Logout error...');
        }
    };

    return (
        <div className={isNavOpen ? 'adminNavbar-wrapper ' : 'adminNavbar-wrapper  open'}>
            <nav className="admin-sidebar">
                <div className="custom-menu">
                    <div className="admin-btn" onClick={handleShowAdmin}>
                        <i className="fa fa-user-secret" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="background-admin">
                    <div className="admin-logo"></div>
                    <h3>{user.account?.username ? user.account.username : 'Supper Admin'}</h3>
                </div>
                <ul className="admin-list">
                    <li className="admin-item">
                        <Link to="/manage-products">
                            <span className="fa fa-gift mr-3" /> Manage Products
                        </Link>
                    </li>
                    <li className="admin-item">
                        <Link to="/manage-user">
                            <span className="fa fa-users mr-3" /> Manage Users
                        </Link>
                    </li>
                    <li className="admin-item">
                        <Link to="/manage-order">
                            <span className="fa fa-cog mr-3" /> Manage Orders
                        </Link>
                    </li>
                    <li className="admin-item">
                        <Link to="#" onClick={handleLogout}>
                            <span className="fa fa-sign-out mr-3" /> Sign Out
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminNavbar;
