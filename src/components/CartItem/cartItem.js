import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';

const cx = classNames.bind(styles);
const CartItem = (props) => {
    return (
        <>
            <section className={cx('cart-item')}>
                <img
                    className={cx('img')}
                    src="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/275483409_701322197528982_7519997705933680135_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=pJeZ7HwKZM4AX8q6osb&_nc_ht=scontent.fsgn8-4.fna&cb_e2o_trans=q&oh=00_AfB5HowvMuhwGCQizcueS6BrcgXOGNyY41IK40bdqXCYLg&oe=65523BC5"
                    alt="product img"
                />
                <div className={cx('content')}>
                    <div className={cx('title')}>Nhìn anh ế tội ghê Hay anh làm ghệ tôi</div>
                    <div className={cx('price-quantity')}>
                        <div className={cx('price')}>300$</div>
                        <div className={cx('quantity')}>x5</div>
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
