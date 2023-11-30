import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { deleteItemInCart, updateCart } from '~/services/cartService';
import { toast } from 'react-toastify';
import { useContext, useRef, useState } from 'react';
import { CartContext } from '../Header/CartContext';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

const CartItem = (props) => {
    const navigate = useNavigate();

    const { fetchItem, handleCartClose } = useContext(CartContext);
    const { id, thumbnail, name, price, quantity, totalPrice } = props.data;

    const [finalQuantity, setFinalQuantity] = useState(quantity);
    const [totalItemPrice, setTotalItemPrice] = useState(totalPrice);

    const handleItemClick = (id) => {
        navigate(`/product/${id}`);
        handleCartClose();
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

    const handleMinusAddChange = async (index) => {
        let response;
        if (index > 0) {
            response = await updateCart(id, finalQuantity + index, totalItemPrice + price);
        } else if (index < 0) {
            response = await updateCart(id, finalQuantity + index, totalItemPrice - price);
        }
        if (response && response.EC === 0) {
            toast.success(response.EM);
            fetchItem();
        }
    };
    let timeoutId = useRef();
    const handleAdd = async () => {
        setFinalQuantity((prev) => prev + 1);
        setTotalItemPrice(price * (finalQuantity + 1));
        //debounce technique (not ok)
        //debounce
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(() => {
            handleMinusAddChange(1);
        }, 1000);
    };

    const handleMinus = async () => {
        if (finalQuantity <= 1) {
            setFinalQuantity(1);
        } else {
            setFinalQuantity((prev) => prev - 1);
            setTotalItemPrice(price * (finalQuantity - 1));

            clearTimeout(timeoutId.current);
            timeoutId.current = setTimeout(() => {
                handleMinusAddChange(-1);
            }, 1000);
        }
    };

    return (
        <>
            <section className={cx('cart-item')}>
                <img
                    className={cx('img')}
                    src={thumbnail}
                    alt="product img"
                    onClick={() => {
                        handleItemClick(id);
                    }}
                />
                <div className={cx('content')}>
                    <div className={cx('title')}>{name}</div>
                    <div className={cx('price-quantity')}>
                        <div className={cx('price')}>{totalItemPrice}$</div>
                        <div className={cx('quantity-box')}>
                            <button className={cx('btn', 'action-btn')} onClick={handleMinus}>
                                <i className="fa fa-minus"></i>
                            </button>
                            <span className={cx('quant-number')}>{finalQuantity}</span>
                            <button className={cx('btn', 'action-btn')} onClick={handleAdd}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </div>
                        <div className={cx('quantity')}>x{finalQuantity}</div>
                    </div>
                </div>
                <span>
                    <i
                        className={cx('fa fa-trash-o', 'delete-icon')}
                        onClick={() => {
                            handleDeleteItemInCart(id);
                        }}
                    ></i>
                </span>
            </section>
        </>
    );
};

export default CartItem;
