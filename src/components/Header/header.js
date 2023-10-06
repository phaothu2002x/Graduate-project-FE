import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
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
                <div className={cx('nav')}>
                    <ul className={cx('list')}>
                        <li className={cx('item', 'active')}>
                            <Link to="/">Home</Link>
                        </li>
                        <li className={cx('item')}>
                            <Link to="/cart">Feature</Link>
                        </li>
                        <li className={cx('item')}>
                            <Link to="/product">Products</Link>
                        </li>
                        <li className={cx('item')}>
                            <a href="#!">About</a>
                        </li>
                        <li className={cx('item')}>
                            <Link to="/cart">Cart</Link>
                        </li>
                    </ul>
                </div>

                <div className={cx('register')}>
                    <Link to="/login" className={cx('btn')}>
                        Sign in
                    </Link>
                    <Link to="/sign-up" className={cx('btn')}>
                        Sign up
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
