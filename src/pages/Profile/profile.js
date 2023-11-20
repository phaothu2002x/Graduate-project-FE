import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useEffect, useRef, useState } from 'react';
const cx = classNames.bind(styles);

const Profile = (props) => {
    //handle preview avatar
    const inputRef = useRef();
    const [avatar, setAvatar] = useState();

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
    const [name, setName] = useState('');
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
                                                    avatar
                                                        ? avatar.preview
                                                        : 'https://scontent.fsgn8-4.fna.fbcdn.net/v/t1.18169-1/15621761_404189589917935_2697368818095501485_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=wyIBjQ41bUkAX-mitHb&_nc_ht=scontent.fsgn8-4.fna&cb_e2o_trans=q&oh=00_AfDBoaa1VAofXc9bNZMxCxeFgb-uUlkGk60udhV5lJO_1g&oe=6572B2EE'
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
                                                    {!name ? 'Phaothu2002x' : name}
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
                                <div className="px-4 py-3">
                                    <h5 className="mb-0">About</h5>
                                    <div className="p-4 rounded shadow-sm bg-light">
                                        <p className="font-italic mb-0">Email</p>
                                        <p className="font-italic mb-0">Password</p>
                                        <p className="font-italic mb-0">Phone</p>
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