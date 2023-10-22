import classNames from 'classnames/bind';
import styles from './User.module.scss';
import Header from '~/components/Header/header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAllUsers } from '~/services/userService';
import ReactPaginate from 'react-paginate';

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
    const [listUser, setListUser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    const [totalPage, setTotalPage] = useState(0);
    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async (page) => {
        let response = await fetchAllUsers(currentPage, currentLimit);

        if (response && response.data && response.data.EC === 0) {
            console.log(response.data);
            setTotalPage(response.data.DT.totalPages);
            setListUser(response.data.DT.users);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
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
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className={cx('t-body')}>
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
                                                <td>
                                                    <div className={cx('btn-wrap')}>
                                                        <button className={cx('btn btn-warning', 'action-btn')}>edit</button>
                                                        <button className={cx('btn btn-danger', 'action-btn')}>delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </>
                            ) : (
                                <>
                                    <tr>
                                        <td colSpan={5}>NOT FOUND USERS</td>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className={cx('pagination')}>
                    {totalPage > 0 && (
                        <ReactPaginate
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={3}
                            marginPagesDisplayed={2}
                            pageCount={totalPage}
                            previousLabel="< previous"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            containerClassName="pagination"
                            activeClassName="active"
                            renderOnZeroPageCount={null}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
