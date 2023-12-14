import classNames from 'classnames/bind';
import styles from './ManageOrder.module.scss';
import './ManageOrderAccordion.scss';
import { useEffect, useState } from 'react';
import { fetchAllOrder } from '~/services/orderService';
import UpdateStatusModal from './Modals/updateModals';
import ReactPaginate from 'react-paginate';
import DeleteOrderModal from './Modals/deleteOrderModal';
import { toast } from 'react-toastify';
import Accordion from 'react-bootstrap/Accordion';

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

    //date function
    const handleDate = (outputDate) => {
        const dateString = outputDate;
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = date.getMonth() + 1; // Months are zero-based, so add 1
        const day = date.getDate();
        const data = `${day}/${month}/${year} `;
        return data;
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

                <div className="accordion-section">
                    <Accordion defaultActiveKey="0">
                        {orderList && orderList.length > 0 ? (
                            orderList.map((item, index) => (
                                <Accordion.Item eventKey={index} className="order-item" key={`Order-${index}`}>
                                    <Accordion.Header>
                                        <div className="order-item-header">
                                            <span>Order ID: {item.id}</span>
                                            <span>Order Date: {handleDate(item.createdAt)} </span>
                                            <span>Total Amount:{(+item.amount)?.toFixed(2)}$</span>
                                            <span>Status: {item.status}</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body className="order-item-body">
                                        <div className="customer-info">
                                            <h3>Username: {item.name}</h3>
                                            <h3>Email: {item.email}</h3>
                                            <h3>Phone: {item.phone}</h3>
                                            <h3 className="cus-note">Note: {item.note}</h3>

                                            <div className="btn-wrap">
                                                <button
                                                    className="btn btn-primary action-btn"
                                                    onClick={() => {
                                                        handleUpdateClick(item);
                                                    }}
                                                >
                                                    <i className="fa fa-cog"></i>
                                                </button>
                                                <button className="btn btn-danger action-btn" onClick={() => handleDeleteClick(item)}>
                                                    <i className="fa fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>

                                        <div className="separate-bar"></div>
                                        <table className="table table-hover table-bordered table-striped  table-info ">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product Name:</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Amount($)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="tbody-content">
                                                {item.Products ? (
                                                    item.Products.map((pItem, index) => (
                                                        <tr key={`product-${index}`}>
                                                            <th scope="row">
                                                                <span className="pName">{pItem.name}</span>
                                                                <img alt="product item" src={pItem.thumbnail} />
                                                            </th>
                                                            <td>{pItem.price}$</td>
                                                            <td>x{pItem.Order_Detail.quantity}</td>
                                                            <td>{pItem.Order_Detail.totalPrice?.toFixed(2)}$</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan={4}>
                                                            <h2>Order has no product</h2>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))
                        ) : (
                            <h2> Not found Orders</h2>
                        )}
                    </Accordion>
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
