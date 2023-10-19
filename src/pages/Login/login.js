import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Login = (props) => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content-right', 'col-4', 'p-4', 'd-flex', 'flex-column')}>
                    <h1 className={cx('heading')}>LOGIN</h1>
                    <div className={cx('col-12', 'mb-3')}>
                        <label htmlFor="username" className={cx('form-label')}>
                            Username
                        </label>
                        <input type="text" className={cx('form-control')} id="username" placeholder="Enter your username" />
                    </div>
                    <div className={cx('col-12', 'mb-3')}>
                        <label htmlFor="confirmPass" className={cx('form-label')}>
                            Confirm password
                        </label>
                        <input type="password" className={cx('form-control')} id="confirmPass" placeholder="Confirm password" />
                    </div>
                    <hr />
                    <div className="flex-grow-1"></div>
                    <div className={cx('action-btn')}>
                        <Link to="/login" className={cx('btn', 'btn-primary')}>
                            Login
                        </Link>
                        <Link to="/register" className={cx('btn', 'btn-primary')}>
                            Create new account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
