import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
// import Header from '~/components/Header/header';
import Item from './ItemCart/item';

import { useContext, useEffect } from 'react';
import { CartContext } from '~/components/Header/CartContext';

const cx = classNames.bind(styles);

const Cart = (props) => {
    const { cartList, fetchItem } = useContext(CartContext);
    useEffect(() => {
        fetchItem();
    }, []);

    //caculate the totalPrice of items in cart
    const totalPriceInCart = cartList.reduce((acc, currVal) => {
        return acc + currVal.totalPrice;
    }, 0);

    return (
        <div className={cx('wrapper')}>
            {/* <Header /> */}
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col-7', 'content-left')}>
                        <h2 className={cx('heading')}>Thông tin vận chuyển</h2>
                        <div className={cx('row mb-3')}>
                            <div className={cx('col-6')}>
                                <input type="text" className={cx('form-control', 'input')} placeholder="Enter Your full name" />
                            </div>
                            <div className={cx('col-6')}>
                                <input type="text" className={cx('form-control', 'input')} placeholder="Enter Phone number" />
                            </div>
                        </div>
                        <div className={cx('row mb-3')}>
                            <div className={cx('col-12')}>
                                <input type="text" className={cx('form-control', 'input')} placeholder="Enter Email address" />
                            </div>
                        </div>
                        <div className={cx('row mb-3')}>
                            <div className={cx('col-12')}>
                                <input type="text" className={cx('form-control', 'input')} placeholder="Enter Your address" />
                            </div>
                        </div>
                        <div className={cx('row mb-3')}>
                            <div className={cx('col-12')}>
                                <textarea className={cx('form-control', 'textarea-input')} placeholder="Enter Your note here"></textarea>
                            </div>
                        </div>
                        <h2 className={cx('heading')}>Phuong thuc thanh toan</h2>

                        <section className={cx('payment-method')}>
                            <div className={cx('col-12')}>
                                <div className={cx('form-check', 'payment-select')}>
                                    <input className={cx('form-check-input', 'check-input')} id="Momo" type="radio" name="payment" />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="Momo">
                                        <img
                                            src="https://th.bing.com/th/id/OIP.XpHYk_-zX8k6iWYBWw_UKwAAAA?pid=ImgDet&w=256&h=256&rs=1"
                                            alt="momo"
                                            className={cx('payment-img')}
                                        />
                                        MOMO
                                    </label>
                                </div>
                            </div>
                            <div className={cx('col-12')}>
                                <div className={cx('form-check', 'payment-select')}>
                                    <input className={cx('form-check-input', 'check-input')} id="cod" type="radio" name="payment" />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="cod">
                                        <i className={cx('fa fa-truck', 'payment-icon')}></i>
                                        COD
                                    </label>
                                </div>
                            </div>
                            <div className={cx('col-12')}>
                                <div className={cx('form-check', 'payment-select')}>
                                    <input className={cx('form-check-input', 'check-input')} id="bank" type="radio" name="payment" />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="bank">
                                        <i className={cx('fa fa-university', 'payment-icon')}></i>
                                        Banking
                                    </label>
                                </div>
                            </div>
                        </section>
                    </div>
                    {/* cart info  orderDetail info*/}
                    <div className={cx('col-5', 'content-right')}>
                        <h2 className={cx('heading')}>Giỏ hàng</h2>
                        <div className={cx('desc', 'row')}>
                            <p className={cx('title-desc', 'col-8')}>Product Desc</p>
                            <p className={cx('quantity-desc', 'col-2')}>Quantity</p>
                            <p className={cx('price-desc', 'col-2')}>Price</p>
                        </div>

                        <ul className={cx('product-list')}>
                            {cartList && cartList.length > 0 ? (
                                cartList.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <Item data={item} />
                                        </li>
                                    );
                                })
                            ) : (
                                <h1>Empty Items...</h1>
                            )}
                        </ul>

                        <div className={cx('purchase-section')}>
                            <h2 className={cx('title')}>Tong thiet hai</h2>
                            <p className={cx('price')}>{totalPriceInCart}$</p>
                            <button className={cx('btn btn-primary', 'purchase-btn')}>Thanh Toan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
