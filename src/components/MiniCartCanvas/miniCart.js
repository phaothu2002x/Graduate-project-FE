import classNames from 'classnames/bind';
import styles from './MiniCart.module.scss';

import Offcanvas from 'react-bootstrap/Offcanvas';
import CartItem from '../CartItem/cartItem';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from '../Header/CartContext';
const cx = classNames.bind(styles);

const MiniCart = (props) => {
    // const { fetchItem } = props;

    const { cartList, cartShow, handleCartClose } = useContext(CartContext);
    //caculate total items
    const totalItems = cartList.reduce((acc, currentVal) => {
        return acc + currentVal.quantity;
    }, 0);

    return (
        <>
            <Offcanvas show={cartShow} onHide={handleCartClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className={cx('canvas-heading')}>Your Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className={cx('content')}>
                        <div className={cx('desc')}>
                            <div className={cx('title')}>{totalItems || '0'} items</div>
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
