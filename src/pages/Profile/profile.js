import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useContext, useEffect, useRef, useState } from 'react';
import { updateProfileUser } from '~/services/userService';
import { toast } from 'react-toastify';
import { UserContext } from '~/context/UserContext';
const cx = classNames.bind(styles);

const Profile = (props) => {
    const { user, fetchUser } = useContext(UserContext);
    const account = user.account;
    // console.log('check account', account);
    //handle preview avatar
    const inputRef = useRef();
    const [avatar, setAvatar] = useState(account.avatar);

    const [name, setName] = useState(account.username);
    const [email, setEmail] = useState(account.email);
    const [phone, setPhone] = useState(account.phone);

    useEffect(() => {
        //cleanup func
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);
    const handleChangeAvatar = () => {
        inputRef.current.click();
    };

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setAvatar(file);
        }
    };

    //handle change name
    const [isEdit, setIsEdit] = useState(true);

    const handleDoubleClick = () => {
        setIsEdit(false);
    };
    const handleKeyDown = (e) => {
        if (e.code === 'Enter') {
            setIsEdit(true);
        }
    };
    const handleOnBlur = (e) => {
        setIsEdit(true);
    };

    // handle change user info section
    const [isEmailEdit, setIsEmailEdit] = useState(true);
    const [isPhonelEdit, setIsPhoneEdit] = useState(true);

    const handleInputDoubleClick = (name) => {
        if (name === 'email') {
            setIsEmailEdit(false);
        }
        if (name === 'phone') {
            setIsPhoneEdit(false);
        }
    };

    const handleOnblurInput = (name) => {
        if (name === 'phone') {
            setIsPhoneEdit(true);
        }
        if (name === 'email') {
            setIsEmailEdit(true);
        }
    };

    const handleInputKeyDown = (name, code) => {
        if (name === 'email' && code === 'Enter') {
            setIsEmailEdit(true);
        }
        if (name === 'phone' && code === 'Enter') {
            setIsPhoneEdit(true);
        }
    };

    const checkEmptyInput = () => {
        if (!email) {
            toast.error('Email is required!');
            return false;
        }
        if (!phone) {
            toast.error('phone is required!');
            return false;
        }
        if (!name) {
            toast.error('name is required!');
            return false;
        }
        return true;
    };

    const handleUpdateClick = async () => {
        let check = checkEmptyInput();
        let profileData = { userId: account.userId, username: name, email, phone };
        const formData = new FormData();
        if (check) {
            formData.append('avatar', avatar);
            // console.log(profileData, avatar);
            for (let key in profileData) {
                if (profileData.hasOwnProperty(key)) {
                    formData.append(key, profileData[key]);
                }
            }
            //call api update profile
            let response = await updateProfileUser(formData);
            if (response && response.EC === 0) {
                toast.success('update successfully');
                await fetchUser();
            } else if (response && response.EC !== 0) {
                toast.error(response.EM);
            }
        }
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className="row py-5 px-4">
                        <div className="col-md-5 mx-auto">
                            {/* Profile widget */}
                            <div className="bg-white shadow rounded overflow-hidden">
                                <div className={cx('px-4 pt-0 pb-4 ', 'cover')}>
                                    <div className={cx('media align-items-end', 'profile-head')}>
                                        <div className={cx('mr-3', 'profile')}>
                                            <img
                                                src={
                                                    avatar && avatar.preview ? avatar.preview : avatar
                                                    // https://scontent.fsgn8-4.fna.fbcdn.net/v/t1.18169-1/15621761_404189589917935_2697368818095501485_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=wyIBjQ41bUkAX-mitHb&_nc_ht=scontent.fsgn8-4.fna&cb_e2o_trans=q&oh=00_AfDBoaa1VAofXc9bNZMxCxeFgb-uUlkGk60udhV5lJO_1g&oe=6572B2EE
                                                }
                                                alt="..."
                                                className={cx('rounded img-thumbnail', 'avatar')}
                                            />

                                            <button
                                                type="file"
                                                className={cx('btn  btn-sm btn-block', 'edit-btn')}
                                                onClick={handleChangeAvatar}
                                            >
                                                Change Avatar
                                            </button>
                                            <input type="file" onChange={handlePreviewAvatar} ref={inputRef} style={{ display: 'none' }} />
                                        </div>
                                        <div className={cx('mb-5 text-white', 'media-body')}>
                                            {isEdit ? (
                                                <h4 className={cx('mb-0', 'username')} onDoubleClick={handleDoubleClick}>
                                                    {!name ? 'Name is required' : name}
                                                </h4>
                                            ) : (
                                                <input
                                                    onKeyDown={handleKeyDown}
                                                    onBlur={handleOnBlur}
                                                    value={name}
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                    }}
                                                    autoFocus
                                                    className={cx('input-name')}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('bg-light p-4 d-flex justify-content-center text-center', 'order-section')}>
                                    <ul className="list-inline mb-0">
                                        <li className="list-inline-item">
                                            <h4 className="font-weight-bold mb-0 d-block">215</h4>
                                            <small className={cx('text-muted')}>
                                                <i className={cx('fa fa-briefcase')}></i>
                                                Orders
                                            </small>
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx('px-4 py-3', 'about-section')}>
                                    <h5 className={cx('mb-0', 'title')}>About</h5>
                                    <div className={cx('p-4 rounded shadow-sm bg-light', 'info-detail')}>
                                        <div className={cx('input-group mb-4 d-flex align-items-center')}>
                                            <span className={cx('input-title')}>Email:</span>
                                            {isEmailEdit ? (
                                                <span onDoubleClick={() => handleInputDoubleClick('email')}>
                                                    {!email ? 'Email is required' : email}
                                                </span>
                                            ) : (
                                                <input
                                                    type="text"
                                                    className={cx('form-control', 'input-text')}
                                                    onBlur={() => {
                                                        handleOnblurInput('email');
                                                    }}
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        handleInputKeyDown('email', e.code);
                                                    }}
                                                    autoFocus
                                                />
                                            )}
                                        </div>
                                        <div className={cx('input-group mb-3 d-flex align-items-center')}>
                                            <span className={cx('input-title')}>Phone:</span>
                                            {isPhonelEdit ? (
                                                <span onDoubleClick={() => handleInputDoubleClick('phone')}>
                                                    {!phone ? 'Phone is required' : phone}
                                                </span>
                                            ) : (
                                                <input
                                                    type="text"
                                                    className={cx('form-control', 'input-text')}
                                                    onBlur={() => {
                                                        handleOnblurInput('phone');
                                                    }}
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        handleInputKeyDown('phone', e.code);
                                                    }}
                                                    autoFocus
                                                    required
                                                />
                                            )}
                                        </div>
                                    </div>
                                    <div className={cx('update-info-btn')}>
                                        <button onClick={handleUpdateClick}>Update</button>
                                    </div>
                                </div>
                                <div className="py-4 px-4">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <h5 className="mb-0">Recent Orders</h5>
                                        <a href="#" className="btn btn-link text-muted">
                                            Show all
                                        </a>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-6 mb-2 pr-lg-1">
                                            <img
                                                src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                                                alt=""
                                                className="img-fluid rounded shadow-sm"
                                            />
                                        </div>
                                        <div className="col-lg-6 mb-2 pl-lg-1">
                                            <img
                                                src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                                                alt=""
                                                className="img-fluid rounded shadow-sm"
                                            />
                                        </div>
                                        <div className="col-lg-6 pr-lg-1 mb-2">
                                            <img
                                                src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                                                alt=""
                                                className="img-fluid rounded shadow-sm"
                                            />
                                        </div>
                                        <div className="col-lg-6 pl-lg-1">
                                            <img
                                                src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
                                                alt=""
                                                className="img-fluid rounded shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
