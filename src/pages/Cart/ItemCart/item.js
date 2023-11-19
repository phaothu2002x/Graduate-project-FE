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
    const { id, thumbnail, name, quantity, totalPrice } = props.data;

    const { fetchItem } = useContext(CartContext);

    const handleItemClick = (id) => {
        navigate(`/product/${id}`);
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
            <div className={cx('product-item', 'row')}>
                <div className={cx('product-info', 'col-8')}>
                    <img src={thumbnail} alt="product-img" className={cx('product-img')} onClick={() => handleItemClick(id)} />
                    <div className={cx('product-detail')}>
                        <p className={cx('title')}>{name}</p>
                        <span className={cx('delete-icon')} onClick={() => handleDeleteItemInCart(id)}>
                            <i className="fa fa-trash-o"></i>
                            <p>delete</p>
                        </span>
                    </div>
                </div>
                <div className={cx('product-quantity', 'col-2')}>
                    <span className={cx('quant-number')}>{quantity}</span>
                </div>
                <div className={cx('product-price', 'col-2')}>{totalPrice}$</div>
            </div>
        </>
    );
};

export default Item;
