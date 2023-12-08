import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import Header from '~/components/Header/header';
import images from '~/assets/images';

import { useState, useEffect, useContext } from 'react';
import { findProductById, findSuggestion } from '~/services/productService';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addProductToCart } from '~/services/cartService';
import { CartContext } from '~/components/Header/CartContext';
import RecommendProduct from '~/components/Slider/recommendProduct';
const cx = classNames.bind(styles);

const ProductDetail = (props) => {
    const [imageSelected, setImageSelected] = useState(0);
    const [imageGallery, setImageGallery] = useState([]);

    //
    const { id } = useParams();
    const { fetchItem } = useContext(CartContext);

    const tabs = ['Related Products', 'reviews'];
    const [type, setType] = useState('Related Products');

    const [productData, setProductData] = useState({});
    const [suggestList, setSuggestList] = useState([]);
    const { name, description, price, code, Category, Types, Brand } = productData;

    useEffect(() => {
        fetchProductDetail();
    }, []);

    const fetchProductDetail = async () => {
        let response = await findProductById(id);
        if (response && response.EC === 0) {
            setProductData(response.DT);
            if (response.DT.Product_Galleries) {
                let data = buildGallery(response.DT.thumbnail, response.DT.Product_Galleries);
                setImageGallery(data);
            }
            fetchSuggestion(response.DT.CategoryId);
        } else {
            toast.error('cannot fetch product detail...');
        }
    };

    //fetch recommend product by category:
    const fetchSuggestion = async (CategoryId) => {
        let response = await findSuggestion(CategoryId);
        if (response && response.EC === 0) {
            setSuggestList(response.DT);
        } else {
            toast.error('cannot find suggestion');
        }
    };

    const buildGallery = (thumb, galleryArr) => {
        let key = 'url';
        let galleryList = galleryArr.map((item) => item[key]);
        galleryList.unshift(thumb);
        return galleryList;
    };

    const handleActiveImg = (index) => {
        setImageSelected(index);
    };

    //handle slider change interval
    useEffect(() => {
        const timerId = setInterval(() => {
            if (imageSelected === imageGallery.length - 1) {
                setImageSelected(0);
            } else {
                setImageSelected((prev) => prev + 1);
            }
        }, 4000);

        //clean up func
        return () => clearInterval(timerId);
    }, [imageSelected, imageGallery.length]);

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
            // fetchQuantity();
        } else {
            setFinalQuant(quantity);
        }
        //call api => add to cart
        let response = await addProductToCart(id, quantity, price);
        if (response && response.EC === 0) {
            toast.success(response.EM);
        }
        fetchItem();
    };

    const handleSlideShow = (length) => {
        if (length >= 4) {
            return 4;
        } else if (length > 1) {
            return length;
        } else {
            return 1;
        }
    };

    // console.log('Category', Category);

    return (
        <div className={cx('wrapper')}>
            {/* <Header quantity={finalQuant} /> */}
            <div className={cx('inner')}>
                <div className={cx('banner')}>Breadcrumbs</div>
                <div className={cx('product-container')}>
                    <div className={cx('content-left')}>
                        <div className={cx('product-item')}>
                            <img src={imageGallery[imageSelected]} alt="thumbnail" className={cx('thumb')} />
                            {/* <img src={imageGalleryArr[imageSelected] || images.productImg1} alt="thumbnail" className={cx('thumb')} /> */}
                        </div>
                        <div className={cx('product-slider')}>
                            {/* dùng map để render */}
                            {imageGallery.length > 0 ? (
                                imageGallery.map((item, index) => {
                                    return (
                                        <img
                                            src={item}
                                            alt="slider"
                                            className={imageSelected === index ? cx('slider-items', 'active') : cx('slider-items')}
                                            key={index}
                                            onClick={() => {
                                                handleActiveImg(index);
                                            }}
                                        />
                                    );
                                })
                            ) : (
                                <></>
                            )}
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
                                        {Brand && Brand.name}
                                    </a>
                                    <a href="#!" className={cx('switch-tag', 'tags')}>
                                        {Category && Category.name}
                                    </a>
                                </div>
                            </section>
                            <section className={cx('product-type')}>
                                <h3 className={cx('desc-title')}>Types:</h3>
                                <div className={cx('type-tags')}>
                                    {Types &&
                                        Types.length > 0 &&
                                        Types.map((item, index) => (
                                            <a href="#!" className={cx('type-tag', 'tags')} key={index}>
                                                {item.name}
                                            </a>
                                        ))}
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
                <div className={cx('product-suggestion')}>
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

                {type === 'Related Products' ? (
                    <RecommendProduct data={suggestList} slideShow={handleSlideShow} />
                ) : (
                    <h2>Still developing</h2>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;
