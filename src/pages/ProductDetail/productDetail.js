import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import Header from '~/components/Header/header';
import images from '~/assets/images';
import Carousel from 'react-bootstrap/Carousel';
import { useState } from 'react';

const cx = classNames.bind(styles);
const ProductDetail = (props) => {
    const tabs = ['Description', 'feature', 'reviews'];
    const [type, setType] = useState('Description');
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('inner')}>
                <div className={cx('banner')}>Breadcrumbs</div>
                <div className={cx('product-container')}>
                    <div className={cx('content-left')}>
                        <div className={cx('product-item')}>
                            <Carousel>
                                <Carousel.Item>
                                    <img src={images.productImg6} alt="thumbnail" className={cx('thumb')} />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={images.productImg3} alt="thumbnail" className={cx('thumb')} />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img src={images.productImg2} alt="thumbnail" className={cx('thumb')} />
                                </Carousel.Item>
                            </Carousel>
                        </div>
                        <div className={cx('product-slider')}>
                            {/* dùng map để render */}
                            <img src={images.productImg5} alt="slider" className={cx('slider-items', 'active')} />
                            <img src={images.productImg5} alt="slider" className={cx('slider-items')} />
                            <img src={images.productImg5} alt="slider" className={cx('slider-items')} />
                            <img src={images.productImg5} alt="slider" className={cx('slider-items')} />
                        </div>
                    </div>
                    <div className={cx('content-right')}>
                        <h1 className={cx('heading')}>Coffee Beans - Espresso Arabica and Robusta Beans</h1>
                        <div className={cx('rating')}>
                            <span className={cx('star-icon')}>
                                <i className={cx('fa fa-star')}></i>
                            </span>
                            (<span className={cx('index')}>3.5</span>)<span className={cx('review-numb')}>1100 reviews</span>
                        </div>
                        <h3 className={cx('desc-title')}>Detail:</h3>
                        <p className={cx('desc')}>
                            It comes with extra teflon pads (in case you want to perform the Force Break mod) and tape (in case you want to
                            perform a Tape mod). The M3 offers flexibility for you to modify it and make it truly yours while also offering
                            a great out-of-the-box
                        </p>
                        <div className={cx('category')}>
                            <section className={cx('product-category')}>
                                <h3 className={cx('desc-title')}>Category:</h3>
                                <div className={cx('category-tags')}>
                                    <a href="#!" className={cx('brand-tag', 'tags')}>
                                        {props.brandTag || 'Akko'}
                                    </a>
                                    <a href="#!" className={cx('type-tag', 'tags')}>
                                        {props.typeTag || 'Custom'}
                                    </a>
                                    <a href="#!" className={cx('switch-tag', 'tags')}>
                                        {props.switchTag || 'red switch'}
                                    </a>
                                </div>
                            </section>
                            <section className={cx('product-type')}>
                                <h3 className={cx('desc-title')}>Types:</h3>
                                <div className={cx('type-tags')}>
                                    <a href="#!" className={cx('brand-tag', 'tags')}>
                                        {props.brandTag || 'Akko'}
                                    </a>
                                    <a href="#!" className={cx('type-tag', 'tags')}>
                                        {props.typeTag || 'Custom'}
                                    </a>
                                    <a href="#!" className={cx('switch-tag', 'tags')}>
                                        {props.switchTag || 'red switch'}
                                    </a>
                                </div>
                            </section>
                        </div>
                        <div className={cx('purchase')}>
                            <p className={cx('original-price')}>
                                $500.00
                                <span className={cx('discount')}>10%</span>
                            </p>
                            <div className={cx('price')}>$540.00</div>
                            <div className={cx('purchase-action')}>
                                <button type="button" className={cx('btn btn-warning', 'add-cart-btn')}>
                                    Add to cart
                                </button>
                                <button className={cx('like')}>
                                    <i className={cx('fa fa-heart-o', 'like-icon')}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('product-detail')}>
                    <ul className={cx('nav nav-tabs')}>
                        {tabs.map((tab, index) => {
                            return (
                                <li key={index} className={cx('nav-item')}>
                                    <button onClick={() => setType(tab)} className={tab === type ? 'nav-link active' : 'nav-link'}>
                                        {tab}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
