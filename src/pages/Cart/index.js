import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Header from '~/components/Header/header';

const cx = classNames.bind(styles);
const Cart = (props) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
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
                    <div className={cx('col-5', 'content-right')}>product in cart</div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
