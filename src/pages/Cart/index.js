import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
// import Header from '~/components/Header/header';
import Item from './ItemCart/item';
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '~/components/Header/CartContext';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { createOrder } from '~/services/orderService';
import { useNavigate } from 'react-router-dom';
import { fetchPaymentMethod } from '~/services/cartService';
import { UserContext } from '~/context/UserContext';

const cx = classNames.bind(styles);

const Cart = (props) => {
    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const { cartList, clearCartList, fetchItem } = useContext(CartContext);

    const account = user.account;

    const [paymentChecked, setPaymentChecked] = useState(1);
    const [paymentInfo, setPaymentInfo] = useState([]);
    //caculate the totalPrice of items in cart
    const totalPriceInCart = cartList.reduce((acc, currVal) => {
        return acc + currVal.totalPrice;
    }, 0);
    useEffect(() => {
        fetchItem();
    }, []);

    useEffect(() => {
        fetchPayment();
    }, [paymentChecked]);

    //payment select section
    const fetchPayment = async () => {
        let response = await fetchPaymentMethod(paymentChecked);
        if (response && response.EC === 0) {
            setPaymentInfo(response.DT);
        }
        if (response && response.EC !== 0) {
            toast.error(response.EM);
        }
        if (!response) {
            // toast.error('fetch payment error');
        }
    };

    //input section
    const defaultValidInput = {
        name: true,
        phone: true,
        email: true,
        address: true,
        note: true,
    };

    const defaultUserValue = {
        name: '',
        phone: '',
        email: '',
        address: '',
        note: '',
    };
    const [userValue, setUserValue] = useState(defaultUserValue);
    const [isValidInput, setIsValidInput] = useState(defaultValidInput);

    const handleInputChange = (value, name) => {
        if (userValue[name] !== '') {
            let _userValue = _.cloneDeep(defaultValidInput);
            _userValue[name] = true;
            setIsValidInput(_userValue);
        }
        let _userValue = _.cloneDeep(userValue);
        _userValue[name] = value;
        setUserValue(_userValue);
    };

    //validation input
    const checkValidInput = () => {
        setIsValidInput(defaultValidInput);
        let check = true;
        //for input
        let arr = ['name', 'phone', 'email', 'address', 'note'];
        for (let i = 0; i < arr.length; i++) {
            if (!userValue[arr[i]]) {
                let _validInput = _.cloneDeep(defaultValidInput);
                _validInput[arr[i]] = false;
                setIsValidInput(_validInput);
                toast.error(`empty input ${arr[i]}`);
                check = false;
                break;
            }
        }

        if (check === true) {
            let regx = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            if (!regx.test(userValue.email)) {
                toast.error(<h3>Email is invalid</h3>);
                setIsValidInput({ ...defaultValidInput, email: false });
                return false;
            }
        }
        return check;
    };

    const handlePurchase = async () => {
        let orderInfo = {};
        let userId = account.userId;
        let check = checkValidInput();
        if (check) {
            // console.log('check user data', userValue);
            orderInfo = { userId, userValue, totalPriceInCart, productList: cartList };
            // call api
            // console.log(orderInfo);
            let response = await createOrder(orderInfo);

            if (response && response.EC === 0) {
                toast.success(response.EM);
                clearCartList();
                navigate('/manage-order');
            }
            if (response && response.EC !== 0) {
                toast.error(response.EM);
            }
        }
    };
    return (
        <div className={cx('wrapper')}>
            {/* <Header /> */}
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('col-7', 'content-left')}>
                        <h2 className={cx('heading')}>PACKAGE INFORMATION</h2>
                        <div className={cx('row mb-3')}>
                            <div className={cx('col-6')}>
                                <input
                                    type="text"
                                    className={isValidInput.name ? cx('form-control', 'input') : cx('form-control is-invalid', 'input')}
                                    placeholder="Enter Your full name"
                                    value={userValue.name}
                                    onChange={(e) => handleInputChange(e.target.value, 'name')}
                                />
                            </div>
                            <div className={cx('col-6')}>
                                <input
                                    type="text"
                                    className={isValidInput.phone ? cx('form-control', 'input') : cx('form-control is-invalid', 'input')}
                                    placeholder="Enter Phone number"
                                    value={userValue.phone}
                                    onChange={(e) => handleInputChange(e.target.value, 'phone')}
                                />
                            </div>
                        </div>
                        <div className={cx('row mb-3')}>
                            <div className={cx('col-12')}>
                                <input
                                    type="text"
                                    className={isValidInput.email ? cx('form-control', 'input') : cx('form-control is-invalid', 'input')}
                                    placeholder="Enter Email "
                                    value={userValue.email}
                                    onChange={(e) => handleInputChange(e.target.value, 'email')}
                                />
                            </div>
                        </div>
                        <div className={cx('row mb-3')}>
                            <div className={cx('col-12')}>
                                <input
                                    type="text"
                                    className={isValidInput.address ? cx('form-control', 'input') : cx('form-control is-invalid', 'input')}
                                    placeholder="Enter Your address"
                                    value={userValue.address}
                                    onChange={(e) => handleInputChange(e.target.value, 'address')}
                                />
                            </div>
                        </div>
                        <div className={cx('row mb-3')}>
                            <div className={cx('col-12')}>
                                <textarea
                                    className={
                                        isValidInput.note
                                            ? cx('form-control', 'textarea-input')
                                            : cx('form-control is-invalid', 'textarea-input')
                                    }
                                    placeholder="Enter Your note here"
                                    value={userValue.note}
                                    onChange={(e) => handleInputChange(e.target.value, 'note')}
                                ></textarea>
                            </div>
                        </div>
                        <h2 className={cx('heading')}>PAYMENT METHOD:</h2>
                        <section className={cx('payment-method')}>
                            <div className={cx('col-12')}>
                                <div className={cx('form-check', 'payment-select')}>
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        id="Momo"
                                        type="radio"
                                        name="payment"
                                        checked={paymentChecked === 1}
                                        onChange={() => setPaymentChecked(1)}
                                    />
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
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        id="cod"
                                        type="radio"
                                        name="payment"
                                        checked={paymentChecked === 2}
                                        onChange={() => setPaymentChecked(2)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="cod">
                                        <i className={cx('fa fa-truck', 'payment-icon')}></i>
                                        COD
                                    </label>
                                </div>
                            </div>
                            <div className={cx('col-12')}>
                                <div className={cx('form-check', 'payment-select')}>
                                    <input
                                        className={cx('form-check-input', 'check-input')}
                                        id="bank"
                                        type="radio"
                                        name="payment"
                                        checked={paymentChecked === 3}
                                        onChange={() => setPaymentChecked(3)}
                                    />
                                    <label className={cx('form-check-label', 'input-name')} htmlFor="bank">
                                        <i className={cx('fa fa-university', 'payment-icon')}></i>
                                        Banking
                                    </label>
                                </div>
                            </div>
                        </section>

                        <div className={cx('Payment-info')}>
                            {paymentInfo && paymentInfo.length > 0 && (
                                <>
                                    <h2 className={cx('title')}>BANKING INFORMATION:</h2>
                                    <div className={cx('payment-options')}>
                                        <div className={cx('first-option')}>
                                            <img src={paymentInfo[0].img} alt="payment img" />
                                            <p>Scan QR code</p>
                                        </div>
                                        <div className={cx('second-option')}>
                                            <h3 className={cx('desc')}>{paymentInfo[0].description}</h3>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {/* cart info  orderDetail info*/}
                    <div className={cx('col-5', 'content-right')}>
                        <h2 className={cx('heading')}>Your Shopping Cart</h2>
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
                            <h2 className={cx('title')}>Total Price:</h2>
                            <p className={cx('price')}>{totalPriceInCart?.toFixed(2)}$</p>
                            <button
                                className={cx('btn btn-primary', 'purchase-btn')}
                                onClick={() => handlePurchase()}
                                disabled={cartList && cartList.length > 0 ? false : true}
                            >
                                Make Purchase Here
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
