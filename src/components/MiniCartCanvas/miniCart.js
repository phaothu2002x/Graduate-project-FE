import classNames from 'classnames/bind';
import styles from './MiniCart.module.scss';

import Offcanvas from 'react-bootstrap/Offcanvas';

const cx = classNames.bind(styles);

const MiniCart = (props) => {
    return (
        <Offcanvas show={props.cartShow} onHide={props.handleCartClose} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className={cx('heading')}>Your Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className={cx('content')}>Your product Item....</div>
                <button className={cx('btn btn-primary', 'seeAllBtn')}>See all products</button>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default MiniCart;
