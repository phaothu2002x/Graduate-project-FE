import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const Products = (props) => {
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
                            Popular Keyboards
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Products;
