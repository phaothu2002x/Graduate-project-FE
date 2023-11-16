import classNames from 'classnames/bind';
import styles from './ManageOrder.module.scss';
import { useEffect, useState } from 'react';
import { fetchAllOrder } from '~/services/orderService';

const cx = classNames.bind(styles);
const ManageProduct = (props) => {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        let response = await fetchAllOrder();
        if (response && response.EC === 0) {
            setOrderList(response.DT);
        }
    };

    const handleUpdateClick = () => {
        alert('me');
    };
    const hanldeDeleteClick = () => {
        alert('delete ');
    };

    return (
        <div className={cx('wrapper')}>
            {/* <Header /> */}
            <div className={cx('inner')}>
                <div className={cx('heading')}>Manage Orders !!!</div>
                <div className={cx('action-btn')}>
                    <button className={cx('btn btn-success', 'refresh-btn')}>
                        <span className={cx('refresh-icon')}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </span>
                        Refresh
                    </button>
                </div>
                {/* content */}
                <div className={cx('content')}>
                    <table className="table table-hover table-bordered table-striped ">
                        <thead className={cx('t-head')}>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">UserName</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Note</th>
                                <th scope="col">TotalPrice</th>
                                <th scope="col">status</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className={cx('t-body')}>
                            {orderList && orderList.length > 0 ? (
                                orderList.map((item, index) => {
                                    return (
                                        <tr key={`item-${index}`}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.note}</td>
                                            <td>${item.amount}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <div className={cx('btn-wrap')}>
                                                    <button
                                                        className={cx('btn btn-primary', 'action-btn')}
                                                        onClick={() => {
                                                            handleUpdateClick();
                                                        }}
                                                    >
                                                        <i class="fa fa-cog"></i>
                                                    </button>
                                                    <button
                                                        className={cx('btn btn-danger', 'action-btn')}
                                                        onClick={() => hanldeDeleteClick()}
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <h1>Not found Orders</h1>
                            )}
                        </tbody>
                        {/* <tbody className={cx('t-body')}>
                            {listUser && listUser.length > 0 ? (
                                <>
                                    {listUser.map((row, index) => {
                                        return (
                                            <tr key={`row-${index}`}>
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
                        </tbody> */}
                    </table>
                </div>

                {/* <div className={cx('pagination')}>
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
                </div> */}
            </div>
        </div>
    );
};

export default ManageProduct;
