import classNames from 'classnames/bind';
import styles from './ItemInCart.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);
const Item = (props) => {
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        setQuantity((prev) => prev + 1);
    };
    const handleMinus = () => {
        if (quantity <= 1) {
            setQuantity(1);
        } else {
            setQuantity((prev) => prev - 1);
        }
    };
    return (
        <>
            <div className={cx('product-item', 'row')}>
                <div className={cx('product-info', 'col-8')}>
                    <img
                        src="https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/347604309_3696653077250521_7183040639651625007_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=PCw16OENK1AAX_Lz0-q&_nc_ht=scontent.fsgn8-3.fna&cb_e2o_trans=q&oh=00_AfACflsHoQ0-qRyqB5kHOuh2rAVZUs0YsiVagArZaR2ivg&oe=65531BF8"
                        alt="product-img"
                        className={cx('product-img')}
                    />
                    <div className={cx('product-detail')}>
                        <p className={cx('title')}>Áo nỉ chui đầu essential</p>
                        <span className={cx('delete-icon')}>
                            <i className="fa fa-trash-o"></i>
                            <p>delete</p>
                        </span>
                    </div>
                </div>
                <div className={cx('product-quantity', 'col-2')}>
                    <div className={cx('quantity-box')}>
                        <button className={cx('btn', 'action-btn')} onClick={handleMinus}>
                            <i className="fa fa-minus"></i>
                        </button>
                        <span className={cx('quant-number')}>{quantity}</span>
                        <button className={cx('btn', 'action-btn')} onClick={handleAdd}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div className={cx('product-price', 'col-2')}>314$</div>
            </div>
        </>
    );
};

export default Item;
