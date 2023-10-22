import classNames from 'classnames/bind';
import styles from './User.module.scss';
import Header from '~/components/Header/header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAllUsers } from '~/services/userService';

const cx = classNames.bind(styles);

const ManageUser = (props) => {
    const navigate = useNavigate();
    //check session
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        // console.log(session);
        if (!session) {
            navigate('/');
        }
    }, []);

    //===*===
    const [listUser, setlistUser] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        let response = await fetchAllUsers();

        if (response && response.data && response.data.EC === 0) {
            setlistUser(response.data.DT);
            console.log(listUser);
            console.log('>>>check response', response.data.DT);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('inner')}>
                <div className={cx('heading')}>Manage Users !!!</div>
                <div className={cx('action-btn')}>
                    <button className={cx('btn btn-success', 'refresh-btn')}>Refresh</button>
                    <button className={cx('btn btn-primary', 'addNew-btn')}>Add New</button>
                </div>

                <div className={cx('content')}>
                    <table className="table table-hover table-bordered table-striped ">
                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">ID</th>
                                <th scope="col">UserName</th>
                                <th scope="col">Email</th>
                                <th scope="col">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listUser && listUser.length > 0 ? (
                                <>
                                    {listUser.map((row, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
                                                <td>{index + 1}</td>
                                                <td>{row.id}</td>
                                                <td>{row.username}</td>
                                                <td>{row.email}</td>
                                                <td>{row.Role ? row.Role.name : ''}</td>
                                            </tr>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    <h1>NOT FOUND USERS</h1>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={cx('pagination')}>Paginnation</div>
            </div>
        </div>
    );
};

export default ManageUser;
