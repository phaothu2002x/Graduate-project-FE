import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import images from '~/assets/images';
import './Header.scss';
import MiniCart from '../MiniCartCanvas/miniCart';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from './CartContext';
import { UserContext } from '~/context/UserContext';
import { logoutUser } from '~/services/userService';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

const Header = (props) => {
    const navigate = useNavigate();
    const { user, logoutContext } = useContext(UserContext);

    //context hook
    const { itemsInCart, handleCartClicked } = useContext(CartContext);

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

    // home & feature
    const [activeLink, setActiveLink] = useState('');
    const location = useLocation();
    useEffect(() => {
        // Update the active link based on the current location
        setActiveLink(location.pathname + location.hash);
        // console.log('check user', user);
    }, [location]);

    //scroll to top by default
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <header className={cx('wrapper', 'fixed')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <Link to="/">
                            <img src={images.logo} alt="logo" />
                        </Link>
                    </div>

                    <div className={cx('nav', 'nav-scss')}>
                        <ul className={cx('list')}>
                            <li className={cx('item', 'item-scss')}>
                                <Link to="/" exact="true" className={`border-container ${activeLink === '/' ? 'active' : ''}`}>
                                    <i className="fa fa-home" aria-hidden="true"></i>
                                    Home
                                    <div className="border-inner"></div>
                                </Link>
                            </li>
                            <li className={cx('item', 'item-scss')}>
                                <Link to="/#feature" className={`border-container ${activeLink === '/#feature' ? 'active' : ''}`}>
                                    <i className="fa fa-cubes" aria-hidden="true"></i>
                                    Feature
                                    <div className="border-inner"></div>
                                </Link>
                            </li>
                            <li className={cx('item', 'item-scss')}>
                                <NavLink to="/product" className="border-container" onClick={scrollToTop}>
                                    <i className="fa fa-keyboard-o" aria-hidden="true"></i>
                                    Products
                                    <div className="border-inner"></div>
                                </NavLink>
                            </li>
                            <li className={cx('item', 'item-scss')}>
                                <NavLink to="/cart" className="border-container" onClick={scrollToTop}>
                                    <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                                    Cart
                                    <div className="border-inner"></div>
                                </NavLink>
                            </li>
                            <li className={cx('item', 'item-scss')}>
                                <NavLink to="/manage-products" className="border-container" onClick={scrollToTop}>
                                    <i className="fa fa-user-secret" aria-hidden="true"></i>
                                    About
                                    <div className="border-inner"></div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('actions')}>
                        {user && user.isAuthenticated === true ? (
                            <>
                                <div className={cx('position-relative', 'cart-btn')} onClick={() => handleCartClicked()}>
                                    <i className={cx('fa fa-shopping-cart', 'cart-icon')}></i>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
                                        {itemsInCart}
                                    </span>
                                </div>
                                <span className={cx('greeting')}>Hi! {user.account.username}</span>
                                <div className="dropdown">
                                    <img
                                        className="profile-avatar"
                                        src={
                                            user.account && user.account.avatar
                                                ? user.account.avatar
                                                : 'https://res.cloudinary.com/dxpisdy2r/image/upload/v1700608484/graduate-project/bkw1qqy6yqbhwskzw1t5.png'
                                        }
                                        alt=""
                                    />

                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to="/profile/@me">
                                                <i className="fa fa-user-circle" aria-hidden="true"></i>
                                                Your Account
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/profile/orders">
                                                <i className="fa fa-archive" aria-hidden="true"></i>
                                                Your Order
                                            </Link>
                                        </li>
                                        <li>
                                            <hr className="dropdown-divider" />
                                        </li>
                                        <li>
                                            <Link
                                                className="dropdown-item"
                                                to="/"
                                                onClick={() => {
                                                    handleLogout();
                                                }}
                                            >
                                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                                LogOut
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={cx('btn')}>
                                    Sign in
                                </Link>
                                <Link to="/register" className={cx('btn')}>
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>
            <MiniCart
                // cartShow={cartShow}
                // handleCartClose={handleCartClose}
                totalItem={props.quantity}
                // cartList={cartList}
                // fetchItem={fetchItem}
            />
        </>
    );
};

export default Header;
