import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import images from '~/assets/images';
import './Header.scss';
import MiniCart from '../MiniCartCanvas/miniCart';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const cx = classNames.bind(styles);

const Header = (props) => {
    const getSession = sessionStorage.getItem('account');
    let sessionData = JSON.parse(getSession);
    // console.log('check', getSession);

    //context hook
    const { itemsInCart, handleCartClicked } = useContext(CartContext);

    const handleLogout = () => {
        sessionStorage.removeItem('account');
        window.location.reload();
    };

    return (
        <>
            <header className={cx('wrapper', 'fixed')}>
                <div className={cx('inner')}>
                    <div className={cx('logo')}>
                        <Link to="/product">
                            <img src={images.logo} alt="logo" />
                        </Link>
                    </div>

                    <div className={cx('nav', 'nav-scss')}>
                        <ul className={cx('list')}>
                            <li className={cx('item', 'item-scss')}>
                                <NavLink to="/" exact="true" className="border-container">
                                    <i className="fa fa-home" aria-hidden="true"></i>
                                    Home
                                    <div className="border-inner"></div>
                                </NavLink>
                            </li>
                            <li className={cx('item', 'item-scss')}>
                                <NavLink to="/cart" className="border-container">
                                    <i className="fa fa-cubes" aria-hidden="true"></i>
                                    Feature
                                    <div className="border-inner"></div>
                                </NavLink>
                            </li>
                            <li className={cx('item', 'item-scss')}>
                                <NavLink to="/product" className="border-container">
                                    <i className="fa fa-keyboard-o" aria-hidden="true"></i>
                                    Products
                                    <div className="border-inner"></div>
                                </NavLink>
                            </li>
                            <li className={cx('item', 'item-scss')}>
                                <NavLink to="/productDetail" className="border-container">
                                    <i className="fa fa-user-secret" aria-hidden="true"></i>
                                    About
                                    <div className="border-inner"></div>
                                </NavLink>
                            </li>
                            <li className={cx('item', 'item-scss')}>
                                <NavLink to="/cart" className="border-container">
                                    <i className="fa fa-shopping-bag" aria-hidden="true"></i>
                                    Cart
                                    <div className="border-inner"></div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>

                    <div className={cx('actions')}>
                        {sessionData && sessionData.isAuthenticated === true ? (
                            <>
                                <div className={cx('position-relative', 'cart-btn')} onClick={() => handleCartClicked()}>
                                    <i className={cx('fa fa-shopping-cart', 'cart-icon')}></i>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ">
                                        {itemsInCart}
                                    </span>
                                </div>

                                <div className="dropdown">
                                    <img
                                        className="profile-avatar"
                                        src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t1.18169-1/15621761_404189589917935_2697368818095501485_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=wyIBjQ41bUkAX-mitHb&_nc_ht=scontent.fsgn8-4.fna&cb_e2o_trans=q&oh=00_AfDBoaa1VAofXc9bNZMxCxeFgb-uUlkGk60udhV5lJO_1g&oe=6572B2EE"
                                        alt="avatar"
                                    />

                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item" to="/manage-user">
                                                <i className="fa fa-user-circle" aria-hidden="true"></i>
                                                Your Account
                                            </Link>
                                        </li>
                                        <li>
                                            <a className="dropdown-item" href="#!">
                                                <i className="fa fa-archive" aria-hidden="true"></i>
                                                Your Order
                                            </a>
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
