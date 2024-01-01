import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { registerNewUser } from '~/services/userService';

const cx = classNames.bind(styles);

const Register = (props) => {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const defaultValidInput = {
        isValidUserName: true,
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidConfirmPass: true,
    };
    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    // useEffect(() => {
    //     axios.get('http://localhost:8081/api/test-api').then((data) => {
    //         console.log('>>>check data', data);
    //     });
    // }, []);

    //validate

    const isValidate = () => {
        setObjCheckInput(defaultValidInput);

        if (!username) {
            toast.error(<h3>Username is invalid</h3>);
            setObjCheckInput({ ...defaultValidInput, isValidUserName: false });
            return false;
        }
        if (!email) {
            toast.error(<h3>Email is empty</h3>);
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        let regx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
        if (!regx.test(email)) {
            toast.error(<h3>Email is invalid</h3>);
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }
        if (!phone) {
            toast.error(<h3>Phome is invalid</h3>);
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }
        if (!password) {
            toast.error(<h3>Please enter password</h3>);
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }
        if (password !== confirmPass) {
            toast.error(<h3>Password & Confirm password is different</h3>);
            setObjCheckInput({ ...defaultValidInput, isValidConfirmPass: false });
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        let check = isValidate();

        if (check === true) {
            // toast.success('pass data ok');
            let serverData = await registerNewUser(email, phone, username, password, confirmPass);

            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                navigate('/login');
            } else {
                toast.error(serverData.EM);
            }
        }

        // console.log('>>> check data', userData);
    };

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
                        <label htmlFor="username" className={cx('form-label', 'name')}>
                            Username
                        </label>
                        <input
                            type="text"
                            className={
                                objCheckInput.isValidUserName
                                    ? cx('form-control', 'name-input')
                                    : cx('form-control is-invalid', 'name-input')
                            }
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                        />
                    </div>
                    <div className="row">
                        <div className={cx('col-md-6 col-12 mb-3')}>
                            <label htmlFor="email" className={cx('form-label', 'email')}>
                                Email
                            </label>
                            <input
                                type="email"
                                className={
                                    objCheckInput.isValidEmail
                                        ? cx('form-control', 'email-input')
                                        : cx('form-control is-invalid', 'email-input')
                                }
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>

                        <div className={cx('col-md-6 col-12 mb-3')}>
                            <label htmlFor="phone" className={cx('form-label', 'phone')}>
                                Phone
                            </label>
                            <input
                                type="text"
                                className={
                                    objCheckInput.isValidPhone
                                        ? cx('form-control', 'phone-input')
                                        : cx('form-control is-invalid', 'phone-input')
                                }
                                id="phone"
                                placeholder="Enter your Phone number"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('col-md-6 col-12 mb-3')}>
                            <label htmlFor="password" className={cx('form-label', 'password')}>
                                Password
                            </label>
                            <input
                                type="password"
                                className={
                                    objCheckInput.isValidPassword
                                        ? cx('form-control', 'pass-input')
                                        : cx('form-control is-invalid', 'pass-input')
                                }
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <div className={cx('col-md-6 col-12 mb-3')}>
                            <label htmlFor="confirmPass" className={cx('form-label', 'confirmpass')}>
                                Confirm password
                            </label>
                            <input
                                type="password"
                                className={
                                    objCheckInput.isValidConfirmPass
                                        ? cx('form-control', 'confirm-input')
                                        : cx('form-control is-invalid', 'confirm-input')
                                }
                                id="confirmPass"
                                placeholder="Confirm password"
                                value={confirmPass}
                                onChange={(e) => {
                                    setConfirmPass(e.target.value);
                                }}
                            />
                        </div>
                        <hr className={cx('separate')} />
                        <div className={cx('d-flex justify-content-between')}>
                            <button className={cx('btn btn-primary', 'register-btn')} onClick={() => handleRegister()}>
                                Register
                            </button>
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
