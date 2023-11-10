import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import Header from '~/components/Header/header';
import images from '~/assets/images';
import Carousel from 'react-bootstrap/Carousel';
import { useState, useEffect } from 'react';
import { findProductById } from '~/services/productService';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addProductToCart } from '~/services/cartService';
const cx = classNames.bind(styles);

const ProductDetail = (props) => {
    const { id } = useParams();

    const tabs = ['Description', 'feature', 'reviews'];
    const [type, setType] = useState('Description');

    const [productData, setProductData] = useState({});

    const { thumbnail, name, description, price, code } = productData;

    useEffect(() => {
        fetchProductDetail();
    }, []);

    const fetchProductDetail = async () => {
        let response = await findProductById(id);
        if (response && response.EC === 0) {
            setProductData(response.DT);
        } else {
            toast.error(response.EM);
        }
    };

    //increase & decrease function
    const [quantity, setQuantity] = useState(1);
    const [finalQuant, setFinalQuant] = useState();
    const handleAdd = () => {
        setQuantity((prev) => prev + 1);
    };
    const handleMinus = () => {
        if (quantity <= 1) {
            setQuantity(1);
        } else {
            setQuantity((prev) => prev - 1);
        }
    };

    //handle add to cart
    const handleAddToCart = async () => {
        if (typeof finalQuant === 'number') {
            setFinalQuant((prev) => prev + quantity);
        } else {
            setFinalQuant(quantity);
        }

        //call api => add to cart

        let response = await addProductToCart(id, quantity);
        if (response && response.EC === 0) {
            toast.success(response.EM);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <Header quantity={finalQuant} />
            <div className={cx('inner')}>
                <div className={cx('banner')}>Breadcrumbs</div>
                <div className={cx('product-container')}>
                    <div className={cx('content-left')}>
                        <div className={cx('product-item')}>
                            <Carousel>
                                <Carousel.Item>
                                    <img src={thumbnail || images.productImg1} alt="thumbnail" className={cx('thumb')} />
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
                            <img src={thumbnail} alt="slider" className={cx('slider-items', 'active')} />
                            <img src={images.productImg5} alt="slider" className={cx('slider-items')} />
                            <img src={images.productImg5} alt="slider" className={cx('slider-items')} />
                            <img src={images.productImg5} alt="slider" className={cx('slider-items')} />
                        </div>
                    </div>
                    <div className={cx('content-right')}>
                        <h1 className={cx('heading')}>{name}</h1>
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
                            {description}
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
                            <div className={cx('price')}>${price}</div>
                            <div className={cx('purchase-action')}>
                                <button
                                    type="button"
                                    className={cx('btn btn-warning', 'add-cart-btn')}
                                    onClick={() => {
                                        handleAddToCart();
                                    }}
                                >
                                    Add to cart
                                </button>
                                <button className={cx('like')}>
                                    <i className={cx('fa fa-heart-o', 'like-icon')}></i>
                                </button>
                                <div className={cx('quantity-box')}>
                                    <button className={cx('btn', 'action-btn')} onClick={handleMinus}>
                                        <i className="fa fa-minus"></i>
                                    </button>
                                    <span className={cx('quant-number')}>{quantity}</span>
                                    <button className={cx('btn', 'action-btn')} onClick={handleAdd}>
                                        <i className="fa fa-plus"></i>
                                    </button>
                                </div>
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
