import classNames from 'classnames/bind';
import styles from './ManageOrder.module.scss';
import { useEffect, useState } from 'react';
import { fetchAllOrder } from '~/services/orderService';
import UpdateStatusModal from './Modals/updateModals';
import ReactPaginate from 'react-paginate';
import DeleteOrderModal from './Modals/deleteOrderModal';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

const ManageProduct = (props) => {
    const [orderList, setOrderList] = useState([]);

    //pagination
    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(7);

    useEffect(() => {
        fetchOrders();
    }, [currentPage]);

    const fetchOrders = async () => {
        let response = await fetchAllOrder(currentPage, currentLimit);
        if (response && response.EC === 0) {
            setOrderList(response.DT.orders);
            setTotalPage(response.DT.totalPages);
        } else if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
    };

    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1);
    };

    //modal update:
    const [orderData, setOrderData] = useState({});
    const [updateStatusModal, setUpdateStatusModal] = useState(false);

    const handleUpdateClick = (orderItem) => {
        setOrderData(orderItem);
        setUpdateStatusModal(true);
    };

    const handleCloseUpdateStatusModal = () => {
        setOrderData({});
        setUpdateStatusModal(false);
    };

    const onHideModal = async () => {
        setUpdateStatusModal(false);
        fetchOrders();
    };

    //delete modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteClick = (orderItem) => {
        setOrderData(orderItem);
        setShowDeleteModal(true);
    };
    const handleCloseDeleteOrderModal = () => {
        setShowDeleteModal(false);
    };

    const onHideDeleteModal = () => {
        setShowDeleteModal(false);
        fetchOrders();
    };
    //refresh btn
    const handleRefresh = () => {
        fetchOrders();
    };

    return (
        <div className={cx('wrapper')}>
            {/* <Header /> */}
            <div className={cx('inner')}>
                <div className={cx('heading')}>Manage Orders !!!</div>
                <div className={cx('action-btn')}>
                    <button className={cx('btn btn-success', 'refresh-btn')} onClick={handleRefresh}>
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
                                <th scope="col">Email</th>
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
                                            <td>{item.email}</td>
                                            <td>{item.note}</td>
                                            <td>${item.amount}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                <div className={cx('btn-wrap')}>
                                                    <button
                                                        className={cx('btn btn-primary', 'action-btn')}
                                                        onClick={() => {
                                                            handleUpdateClick(item);
                                                        }}
                                                    >
                                                        <i className="fa fa-cog"></i>
                                                    </button>
                                                    <button
                                                        className={cx('btn btn-danger', 'action-btn')}
                                                        onClick={() => handleDeleteClick(item)}
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td>Not found Orders</td>
                                </tr>
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
                <UpdateStatusModal
                    show={updateStatusModal}
                    handleClose={handleCloseUpdateStatusModal}
                    onHide={onHideModal}
                    orderData={orderData}
                />
                <DeleteOrderModal
                    showDeleteModal={showDeleteModal}
                    handleClose={handleCloseDeleteOrderModal}
                    onHideDeleteModal={onHideDeleteModal}
                    orderData={orderData}
                />
            </div>
        </div>
    );
};

export default ManageProduct;
