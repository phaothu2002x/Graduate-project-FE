import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

const Register = (props) => {
    return (
        <div className={cx('login-container')}>
            <div className={cx('container d-flex p-0')}>
                <div className={cx('p-4 col-5 d-none d-md-block', 'content-left')}>
                    <h1 className={cx('heading')}>INFOMATION</h1>
                    <p className={cx('desc')}>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio, eius veniam placeat modi, commodi veritatis
                        animi omnis beatae magni ipsa perspiciatis dolores voluptatum at perferendis laudantium? Nulla quo
                    </p>
                    <Link to="/login" className={cx('btn btn-primary', 'login-btn')}>
                        Have Account
                    </Link>
                </div>
                <div className={cx('col-md-7 col-12 p-4', 'content-right')}>
                    <h1 className={cx('heading')}>REGISTER FORM</h1>
                    <div className={cx('col-md-6 col-12 mb-3')}>
                        <label htmlFor="formGroupExampleInput" className={cx('form-label', 'name')}>
                            Username
                        </label>
                        <input
                            type="text"
                            className={cx('form-control', 'name-input')}
                            id="formGroupExampleInput"
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className={cx('col-md-6 col-12 mb-3')}>
                        <label htmlFor="formGroupExampleInput" className={cx('form-label', 'email')}>
                            Email
                        </label>
                        <input
                            type="text"
                            className={cx('form-control', 'email-input')}
                            id="formGroupExampleInput"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('col-md-6 col-12 mb-3')}>
                            <label htmlFor="formGroupExampleInput" className={cx('form-label', 'password')}>
                                Password
                            </label>
                            <input
                                type="password"
                                className={cx('form-control', 'pass-input')}
                                id="formGroupExampleInput"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className={cx('col-md-6 col-12 mb-3')}>
                            <label htmlFor="formGroupExampleInput" className={cx('form-label', 'confirmpass')}>
                                Confirm password
                            </label>
                            <input
                                type="password"
                                className={cx('form-control', 'confirm-input')}
                                id="formGroupExampleInput"
                                placeholder="Confirm password"
                            />
                        </div>
                        <hr className={cx('separate')} />
                        <div className={cx('d-flex justify-content-between')}>
                            <button className={cx('btn btn-primary', 'register-btn')}>Register</button>
                            <Link to="./login" className={cx('btn btn-primary d-md-none d-block', 'login-btn')}>
                                Have Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
