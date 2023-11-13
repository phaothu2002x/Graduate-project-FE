import classNames from 'classnames/bind';
import styles from './ItemInCart.module.scss';
import { useState, useContext, useEffect } from 'react';
import { updateCart, deleteItemInCart } from '~/services/cartService';
import { toast } from 'react-toastify';

import { CartContext } from '~/components/Header/CartContext';
import { useNavigate } from 'react-router-dom';
// import { debounce } from 'lodash';
const cx = classNames.bind(styles);

const Item = (props) => {
    const navigate = useNavigate();
    const { id, thumbnail, name, price, quantity } = props.data;
    const [finalQuantity, setFinalQuantity] = useState(quantity);
    const { fetchItem } = useContext(CartContext);
    const totalPrice = price * quantity;
    const [totalItemPrice, setTotalItemPrice] = useState(totalPrice);

    const handleItemClick = (id) => {
        navigate(`/product/${id}`);
    };

    const handleMinusAddChange = async (index) => {
        let response = await updateCart(id, finalQuantity + index);
        if (response && response.EC === 0) {
            toast.success(response.EM);
        }
    };

    const handleAdd = async () => {
        setFinalQuantity((prev) => prev + 1);
        setTotalItemPrice(price * (finalQuantity + 1));
        //debounce technique (not ok)
        handleMinusAddChange(1);
    };
    const handleMinus = async () => {
        if (finalQuantity <= 1) {
            setFinalQuantity(1);
        } else {
            setFinalQuantity((prev) => prev - 1);
            setTotalItemPrice(price * (finalQuantity - 1));
            handleMinusAddChange(-1);
        }
    };

    const handleDeleteItemInCart = async (itemId) => {
        // call api
        // console.log('check item id', itemId);
        let response = await deleteItemInCart(itemId);
        if (response && response.EC === 0) {
            toast.success(response.EM);
            fetchItem();
        }
    };

    return (
        <>
            <div className={cx('product-item', 'row')} onClick={() => handleItemClick(id)}>
                <div className={cx('product-info', 'col-8')}>
                    <img src={thumbnail} alt="product-img" className={cx('product-img')} />
                    <div className={cx('product-detail')}>
                        <p className={cx('title')}>{name}</p>
                        <span className={cx('delete-icon')} onClick={() => handleDeleteItemInCart(id)}>
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
                <div className={cx('product-price', 'col-2')}>{totalItemPrice}$</div>
            </div>
        </>
    );
};

export default Item;
