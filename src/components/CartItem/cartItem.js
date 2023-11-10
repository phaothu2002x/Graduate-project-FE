import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

const cx = classNames.bind(styles);
const CartItem = (props) => {
    const { thumbnail, name, price, quantity } = props.data;
    return (
        <>
            <section className={cx('cart-item')}>
                <img className={cx('img')} src={thumbnail} alt="product img" />
                <div className={cx('content')}>
                    <div className={cx('title')}>{name}</div>
                    <div className={cx('price-quantity')}>
                        <div className={cx('price')}>{price}$</div>
                        <div className={cx('quantity')}>x{quantity}</div>
                    </div>
                </div>
                <span>
                    <i className={cx('fa fa-trash-o', 'delete-icon')}></i>
                </span>
            </section>
        </>
    );
};

export default CartItem;
