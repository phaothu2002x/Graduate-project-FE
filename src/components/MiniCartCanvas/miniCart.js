import classNames from 'classnames/bind';
import styles from './MiniCart.module.scss';

import Offcanvas from 'react-bootstrap/Offcanvas';
import CartItem from '../CartItem/cartItem';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const MiniCart = (props) => {
    return (
        <>
            <Offcanvas show={props.cartShow} onHide={props.handleCartClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className={cx('heading')}>Your Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className={cx('content')}>
                        <div className={cx('desc')}>
                            <div className={cx('title')}>{props.totalItem || '0'} items</div>
                            <Link to="/cart">See all Products...</Link>
                        </div>
                        <CartItem />
                        <CartItem />
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default MiniCart;
