import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { deleteItemInCart } from '~/services/cartService';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { CartContext } from '../Header/CartContext';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
const CartItem = (props) => {
    const navigate = useNavigate();
    const { id, thumbnail, name, price, quantity } = props.data;
    const { fetchItem, handleCartClose } = useContext(CartContext);

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

    return (
        <>
            <section
                className={cx('cart-item')}
                onClick={() => {
                    handleItemClick(id);
                }}
            >
                <img className={cx('img')} src={thumbnail} alt="product img" />
                <div className={cx('content')}>
                    <div className={cx('title')}>{name}</div>
                    <div className={cx('price-quantity')}>
                        <div className={cx('price')}>{price}$</div>
                        <div className={cx('quantity')}>x{quantity}</div>
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
