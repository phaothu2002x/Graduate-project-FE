import classNames from 'classnames/bind';
import styles from './Product.module.scss';
import Header from '~/components/Header/header';
import Sidebar from '~/components/Sidebar/sidebar';
import Item from '~/components/ProductItem/item';
import Search from '~/components/Search/search';
import ReactPaginate from 'react-paginate';

//from manage product
import { useState, useEffect } from 'react';
import { fetchAllProduct } from '../../services/productService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// ===========
const cx = classNames.bind(styles);
const Product = (props) => {
    const navigate = useNavigate();
    const [productData, setProductData] = useState([]);

    //pagination
    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(8);

    useEffect(() => {
        //check
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

    const handlePageClick = (e) => {
        setCurrentPage(+e.selected + 1);
    };

    return (
        <div className={cx('wrapper')}>
            {/* <Header /> */}
            <div className={cx('inner')}>
                <Search setProductData={setProductData} currentPage={currentPage} currentLimit={currentLimit} setTotalPage={setTotalPage} />
                <main className={cx('main-content')}>
                    <Sidebar
                        setProductData={setProductData}
                        currentPage={currentPage}
                        currentLimit={currentLimit}
                        setTotalPage={setTotalPage}
                        fetchProduct={fetchProduct}
                    />
                    <div className={cx('product-content')}>
                        <div className={cx('product-list')}>
                            {productData && productData.length > 0 ? (
                                productData.map((item, index) => {
                                    return (
                                        <div
                                            key={`item-${item.id}`}
                                            data-aos="zoom-in-down"
                                            data-aos-delay="400"
                                            data-aos-easing="ease-in-sine"
                                        >
                                            <Item data={item} fetchProduct={fetchProduct} />
                                        </div>
                                    );
                                })
                            ) : (
                                <h1 className={cx('product-list-empty')}>No Product Found...</h1>
                            )}
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
                </main>
            </div>
        </div>
    );
};

export default Product;
