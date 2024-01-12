import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAllProduct } from '~/services/productService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
const Products = (props) => {
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentLimit, setCurrentLimit] = useState(3);
    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        let response = await fetchAllProduct(currentPage, currentLimit);
        if (response && response.EC === 0) {
            setProductList(response.DT.product);
        } else if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
    };

    const handleItemClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <div
            className={cx('product-wrapper')}
            data-aos="zoom-in-down"
            data-aos-offset="-250"
            data-aos-duration="1000"
            data-aos-anchor-placement="center-center"
        >
            {/* <!--course  --> */}
            <div className={cx('course')}>
                <div className={cx('body')}>
                    {/* <!-- course-top --> */}
                    <div className={cx('course-top')}>
                        <p className={cx('title')}>P R O D U C T S</p>
                        <h1
                            className={cx('heading')}
                            data-aos="slide-right"
                            data-aos-offset="-150"
                            data-aos-delay="500"
                            data-aos-duration="800"
                            data-aos-anchor-placement="top-center"
                        >
                            Newest Keyboards
                        </h1>
                        <div className={cx('course-desc')}>
                            <p
                                className={cx('desc')}
                                data-aos="slide-up"
                                data-aos-delay="1000"
                                data-aos-offset="-150"
                                data-aos-duration="700"
                                data-aos-anchor-placement="top-center"
                            >
                                Check out our most popular keyboards that suit for you. Here you can find your favourite one.
                            </p>
                            <Link to="/product" className={cx('courses-view')}>
                                View All Products
                            </Link>
                        </div>
                    </div>

                    {/* <!-- course-content --> */}
                    <div className={cx('course-content')}>
                        <div className={cx('course-list')}>
                            {productList && productList.length > 0 ? (
                                productList.map((item, index) => (
                                    <div className={cx('course-item')} key={index}>
                                        <div className={cx('thumb-wrap')}>
                                            <Link to={`/product/${item.id}`}>
                                                <img src={item.thumbnail} alt={`item-${item.id}`} className={cx('thumb')} />
                                            </Link>
                                        </div>

                                        <div className={cx('course-info')}>
                                            <h2 className={cx('course-title')}>{item.name}</h2>
                                            <p className={cx('price')}>
                                                Fee <strong>${item.price}</strong>
                                            </p>
                                            <p className={cx('desc')}>{item.description}</p>
                                            <div className={cx('course-length')}>
                                                <p className={cx('class-numb')}>40 Classes</p>
                                                <p className={cx('class-time')}>3 Months insurance</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    {/* <!-- course-item1 --> */}
                                    <div className={cx('course-item')}>
                                        <div className={cx('thumb-wrap')}>
                                            <a href="#!">
                                                <img src={images.productImg} alt="course1" className={cx('thumb')} />
                                            </a>
                                        </div>

                                        <div className={cx('course-info')}>
                                            <h2 className={cx('course-title')}>Ergonomic keyboard</h2>
                                            <p className={cx('price')}>
                                                Fee <strong>$200</strong>
                                            </p>
                                            <p className={cx('desc')}>Enhance Your Comfort and Productivity</p>
                                            <div className={cx('course-length')}>
                                                <p className={cx('class-numb')}>40 Classes</p>
                                                <p className={cx('class-time')}>3 Months insurance</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- course-item2 --> */}
                                    <div className={cx('course-item')}>
                                        <div className={cx('thumb-wrap')}>
                                            <a href="#!">
                                                <img src={images.productImg2} alt="course1" className={cx('thumb')} />
                                            </a>
                                        </div>

                                        <div className={cx('course-info')}>
                                            <h2 className={cx('course-title')}>Ergonomic keyboard</h2>
                                            <p className={cx('price')}>
                                                Fee <strong>$200</strong>
                                            </p>
                                            <p className={cx('desc')}>Enhance Your Comfort and Productivity</p>
                                            <div className={cx('course-length')}>
                                                <p className={cx('class-numb')}>40 Classes</p>
                                                <p className={cx('class-time')}>3 Months insurance</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <!-- course-item3 --> */}
                                    <div className={cx('course-item')}>
                                        <div className={cx('thumb-wrap')}>
                                            <a href="#!">
                                                <img src={images.productImg3} alt="course1" className={cx('thumb')} />
                                            </a>
                                        </div>

                                        <div className={cx('course-info')}>
                                            <h2 className={cx('course-title')}>Ergonomic keyboard</h2>
                                            <p className={cx('price')}>
                                                Fee <strong>$200</strong>
                                            </p>
                                            <p className={cx('desc')}>Enhance Your Comfort and Productivity</p>
                                            <div className={cx('course-length')}>
                                                <p className={cx('class-numb')}>40 Classes</p>
                                                <p className={cx('class-time')}>3 Months insurance</p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
