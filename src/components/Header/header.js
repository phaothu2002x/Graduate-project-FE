import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link, NavLink } from 'react-router-dom';
import images from '~/assets/images';
import './Header.scss';
// import { Route } from 'react-router-dom';
const cx = classNames.bind(styles);

const Header = (props) => {
    return (
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
                            <NavLink to="/" exact={true} className="border-container">
                                Home
                                <div className="border-inner"></div>
                            </NavLink>
                        </li>
                        <li className={cx('item', 'item-scss')}>
                            <NavLink to="/cart" className="border-container">
                                Feature
                                <div className="border-inner"></div>
                            </NavLink>
                        </li>
                        <li className={cx('item', 'item-scss')}>
                            <NavLink to="/product" className="border-container">
                                Products
                                <div className="border-inner"></div>
                            </NavLink>
                        </li>
                        <li className={cx('item', 'item-scss')}>
                            <NavLink to="/productDetail" className="border-container">
                                About
                                <div className="border-inner"></div>
                            </NavLink>
                        </li>
                        <li className={cx('item', 'item-scss')}>
                            <NavLink to="/cart" className="border-container">
                                Cart
                                <div className="border-inner"></div>
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <div className={cx('register')}>
                    <Link to="/login" className={cx('btn')}>
                        Sign in
                    </Link>
                    <Link to="/register" className={cx('btn')}>
                        Sign up
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
