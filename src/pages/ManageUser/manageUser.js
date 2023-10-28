import classNames from 'classnames/bind';
import styles from './User.module.scss';
import Header from '~/components/Header/header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteUser, fetchAllUsers } from '~/services/userService';
import ReactPaginate from 'react-paginate';
import ModalDelete from './modalDelete';
import { toast } from 'react-toastify';
import ModalUser from './modalUser';

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

    /// modal delete
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataModal, setDataModal] = useState({});

    const [isShowModalUser, setIsShowModalUser] = useState(false);
    const [actionModalUser, setActionModalUser] = useState('CREATE');

    /// modal update user
    const [dataModalUser, setDataModalUser] = useState({});

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const fetchUsers = async () => {
        let response = await fetchAllUsers(currentPage, currentLimit);

        if (response && response.EC === 0) {
            setTotalPage(response.DT.totalPages);
            setListUser(response.DT.users);
        }
    };

    const handlePageClick = async (event) => {
        setCurrentPage(+event.selected + 1);
    };

    const handleDeleteUser = async (user) => {
        setDataModal(user);
        setIsShowModalDelete(true);
    };

    //=======*======
    //handle modale click
    const handleClose = () => {
        setIsShowModalDelete(false);
        setDataModal({});
    };
    const confirmDelete = async () => {
        let response = await deleteUser(dataModal);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            await fetchUsers();
            setIsShowModalDelete(false);
        } else {
            toast.error(response.EM);
        }
    };

    const onHideModalUser = async () => {
        setIsShowModalUser(false);
        setDataModalUser({});
        await fetchUsers();
    };

    //handle edit button
    const handleEditUser = (user) => {
        setActionModalUser('UPDATE');
        setDataModalUser(user);
        setIsShowModalUser(true);
    };

    const handleRefresh = async () => {
        await fetchUsers();
    };
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('inner')}>
                <div className={cx('heading')}>Manage Users !!!</div>
                <div className={cx('action-btn')}>
                    <button className={cx('btn btn-success', 'refresh-btn')} onClick={() => handleRefresh()}>
                        <span className={cx('refresh-icon')}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </span>
                        Refresh
                    </button>
                    <button
                        onClick={() => {
                            setIsShowModalUser(true);
                            setActionModalUser('CREATE');
                        }}
                        className={cx('btn btn-primary', 'addNew-btn')}
                    >
                        <span className={cx('addNew-icon')}>
                            <i className="fa fa-plus-square"></i>
                        </span>
                        Add New
                    </button>
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
                                                <td>{(currentPage - 1) * currentLimit + index + 1}</td>
                                                <td>{row.id}</td>
                                                <td>{row.username}</td>
                                                <td>{row.email}</td>
                                                <td>{row.Role ? row.Role.name : ''}</td>
                                                <td>
                                                    <div className={cx('btn-wrap')}>
                                                        <button
                                                            className={cx('btn btn-warning', 'action-btn')}
                                                            onClick={() => handleEditUser(row)}
                                                        >
                                                            <i className="fa fa-pencil-square"></i>
                                                        </button>
                                                        <button
                                                            className={cx('btn btn-danger', 'action-btn')}
                                                            onClick={() => handleDeleteUser(row)}
                                                        >
                                                            <i className="fa fa-trash"></i>
                                                        </button>
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
            <ModalDelete show={isShowModalDelete} handleClose={handleClose} confirmDelete={confirmDelete} dataModal={dataModal} />
            <ModalUser show={isShowModalUser} onHide={onHideModalUser} action={actionModalUser} dataModalUser={dataModalUser} />
        </div>
    );
};

export default ManageUser;
