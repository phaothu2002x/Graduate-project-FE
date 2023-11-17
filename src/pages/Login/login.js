import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { LoginUser } from '~/services/userService';

const cx = classNames.bind(styles);

const Login = (props) => {
    const navigate = useNavigate();
    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');

    const defaultValidInput = {
        valueLogin: true,
        password: true,
    };
    const [objValidInput, setObjValidInput] = useState(defaultValidInput);

    //validate
    const isValidate = () => {
        if (!valueLogin) {
            toast.error(<h3>Email/Phone is required</h3>);
            setObjValidInput({ ...defaultValidInput, valueLogin: false });
            return false;
        }
        if (!password) {
            toast.error(<h3>Password is required</h3>);
            setObjValidInput({ ...defaultValidInput, password: false });
            return false;
        }
        return true;
    };

    const handleLogin = async () => {
        setObjValidInput(defaultValidInput);
        let check = isValidate();
        if (check) {
            toast.success(<h3>Check validate success</h3>);
        }
        //call api => truyen data xuong backend
        let res = await LoginUser(valueLogin, password);

        //hung cai backend tra ve qua bien response
        if (res && +res.EC === 0) {
            //success
            let data = {
                isAuthenticated: true,
                token: 'fake token',
            };
            sessionStorage.setItem('account', JSON.stringify(data));
            navigate('/manage-user');
        }
        if (res && +res.EC !== 0) {
            //failed
            toast.error(<h3>{res.EM}</h3>);
        }

        setTimeout(() => {
            window.location.reload();
        }, 2000);
    };

    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (session) {
            navigate('/');
        }
    }, []);
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('content-right', 'col-4', 'p-4', 'd-flex', 'flex-column')}>
                        <h1 className={cx('heading')}>LOGIN</h1>
                        <div className={cx('col-12', 'mb-3')}>
                            <label htmlFor="email" className={cx('form-label', 'title')}>
                                Email/Password
                            </label>
                            <input
                                type="text"
                                className={
                                    objValidInput.valueLogin
                                        ? cx('form-control', 'email-input')
                                        : cx('form-control is-invalid', 'email-input')
                                }
                                id="email"
                                placeholder="Enter your Email/Phone Number"
                                value={valueLogin}
                                onChange={(e) => setValueLogin(e.target.value)}
                            />
                        </div>
                        <div className={cx('col-12', 'mb-3')}>
                            <label htmlFor="confirmPass" className={cx('form-label', 'title')}>
                                Confirm password
                            </label>
                            <input
                                type="password"
                                className={
                                    objValidInput.password
                                        ? cx('form-control', 'password-input')
                                        : cx('form-control is-invalid', 'password-input')
                                }
                                id="confirmPass"
                                placeholder="Confirm password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <hr />
                        <div className="flex-grow-1"></div>
                        <div className={cx('action-btn')}>
                            <Link to="/login" className={cx('btn', 'btn-primary')} onClick={() => handleLogin()}>
                                Login
                            </Link>
                            <Link to="/register" className={cx('btn', 'btn-primary')}>
                                Create new account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="wrapper-login">
                <div className="card-switch">
                    <label className="switch">
                        <input type="checkbox" className="toggle" />
                        <span className="slider" />
                        <span className="card-side" />
                        <div className="flip-card__inner">
                            <div className="flip-card__front">
                                <div className="title">Log in</div>
                                <form className="flip-card__form" action="">
                                    <input className="flip-card__input" name="email" placeholder="Email" type="email" />
                                    <input className="flip-card__input" name="password" placeholder="Password" type="password" />
                                    <button className="flip-card__btn">Let`s go!</button>
                                </form>
                            </div>
                            <div className="flip-card__back">
                                <div className="title">Sign up</div>
                                <form className="flip-card__form" action="">
                                    <input className="flip-card__input" placeholder="Name" type="name" />
                                    <input className="flip-card__input" name="email" placeholder="Email" type="email" />
                                    <input className="flip-card__input" name="password" placeholder="Password" type="password" />
                                    <button className="flip-card__btn">Confirm!</button>
                                </form>
                            </div>
                        </div>
                    </label>
                </div>
            </div> */}
        </>
    );
};

export default Login;
