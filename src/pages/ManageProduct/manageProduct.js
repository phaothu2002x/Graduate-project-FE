import classNames from 'classnames/bind';
import styles from './ManageProduct.module.scss';
import Header from '~/components/Header/header';
import PreviewItem from './previewItems/item';
import { useEffect, useState } from 'react';
import { fetchAllProduct } from '../../services/productService';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
//=============
const cx = classNames.bind(styles);
const ManageProduct = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        // console.log(session);
        if (!session) {
            navigate('/login');
        }
    }, []);

    const [productData, setProductData] = useState([]);

    // pagination
    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(5);

    useEffect(() => {
        fetchProduct();
    }, [currentPage]);

    const fetchProduct = async () => {
        let response = await fetchAllProduct(currentPage, currentLimit);

        if (response && response.EC === 0) {
            // toast.success(response.EM);
            setProductData(response.DT.product);
            setTotalPage(response.DT.totalPages);
        } else if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
    };

    // pagination

    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1);
    };

    //add new product

    const handleRefresh = async () => {
        await fetchProduct();
    };

    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('inner')}>
                <div className={cx('heading')}>Manage Products!!!</div>

                <div className={cx('action-btn')}>
                    <button className={cx('btn btn-success', 'refresh-btn')} onClick={() => handleRefresh()}>
                        <span className={cx('refresh-icon')}>
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                        </span>
                        Refresh
                    </button>
                    <Link to="/manage-products/create" className={cx('btn btn-primary', 'addNew-btn')}>
                        <span className={cx('addNew-icon')}>
                            <i className="fa fa-plus-square"></i>
                        </span>
                        Add New
                    </Link>
                </div>

                <div className={cx('content')}>
                    {productData.map((item, index) => {
                        return (
                            <div key={`item-${item.id}`}>
                                <PreviewItem data={item} fetchProduct={fetchProduct} />
                            </div>
                        );
                    })}
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

export default ManageProduct;
