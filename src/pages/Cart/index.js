import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Header from '~/components/Header/header';

const cx = classNames.bind(styles);
const Cart = (props) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <h1>Cart page</h1>
            </div>
        </div>
    );
};

export default Cart;
