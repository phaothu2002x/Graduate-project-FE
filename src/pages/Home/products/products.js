import classNames from 'classnames/bind';
import styles from './Products.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);
const Products = (props) => {
    return (
        <div className="wrapper">
            {/* <!--course  --> */}
            <div className={cx('course')}>
                <div className={cx('body')}>
                    {/* <!-- course-top --> */}
                    <div className={cx('course-top')}>
                        <p className={cx('title')}>P R O D U C T S</p>
                        <h1 className={cx('heading')}>Popular Keyboards</h1>
                        <div className={cx('course-desc')}>
                            <p className={cx('desc')}>
                                Check out our most popular keyboards that suit for you. Here you can find your favourite one.
                            </p>
                            <a href="#!" className={cx('courses-view')}>
                                View All Products
                            </a>
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
