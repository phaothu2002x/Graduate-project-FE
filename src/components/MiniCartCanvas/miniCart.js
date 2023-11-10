import classNames from 'classnames/bind';
import styles from './MiniCart.module.scss';

import Offcanvas from 'react-bootstrap/Offcanvas';
import CartItem from '../CartItem/cartItem';
import { Link } from 'react-router-dom';
import { fetchItemInCart } from '~/services/cartService';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
const cx = classNames.bind(styles);

const MiniCart = (props) => {
    // const [cartList, setCartList] = useState([]);
    // useEffect(() => {
    //     fetchItem();
    // }, []);

    // const fetchItem = async () => {
    //     let response = await fetchItemInCart();
    //     if (response && response.EC === 0) {
    //         toast.success(response.EM);
    //         setCartList(response.DT);
    //     }
    // };
    const { cartList } = props;

    return (
        <>
            <Offcanvas show={props.cartShow} onHide={props.handleCartClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className={cx('canvas-heading')}>Your Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className={cx('content')}>
                        <div className={cx('desc')}>
                            <div className={cx('title')}>{props.totalItem || '0'} items</div>
                            <Link to="/cart">See all Products...</Link>
                        </div>

                        <ul className={cx('cart-list')}>
                            {cartList && cartList.length > 0 ? (
                                cartList.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <CartItem data={item} />
                                        </li>
                                    );
                                })
                            ) : (
                                <h3>Your cart is Empty</h3>
                            )}
                        </ul>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default MiniCart;
