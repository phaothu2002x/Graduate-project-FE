import classNames from 'classnames/bind';
import styles from './ItemInCart.module.scss';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '~/components/Header/CartContext';
const cx = classNames.bind(styles);
const Item = (props) => {
    const { id, thumbnail, name, price, quantity } = props.data;
    const [finalQuantity, setFinalQuantity] = useState(props.data.quantity);
    // const { fetchItem } = useContext(CartContext);

    const handleAdd = () => {
        setFinalQuantity((prev) => prev + 1);
    };
    const handleMinus = () => {
        if (finalQuantity <= 1) {
            setFinalQuantity(1);
        } else {
            setFinalQuantity((prev) => prev - 1);
        }
    };
    return (
        <>
            <div className={cx('product-item', 'row')}>
                <div className={cx('product-info', 'col-8')}>
                    <img src={thumbnail} alt="product-img" className={cx('product-img')} />
                    <div className={cx('product-detail')}>
                        <p className={cx('title')}>{name}</p>
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
                        <span className={cx('quant-number')}>{finalQuantity}</span>
                        <button className={cx('btn', 'action-btn')} onClick={handleAdd}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </div>
                </div>
                <div className={cx('product-price', 'col-2')}>{price}$</div>
            </div>
        </>
    );
};

export default Item;
