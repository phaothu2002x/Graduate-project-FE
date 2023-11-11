import { createContext, useState } from 'react';
import { fetchItemInCart } from '~/services/cartService';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartShow, setCartShow] = useState(false);
    const [cartList, setCartList] = useState([3]);

    const fetchItem = async () => {
        let response = await fetchItemInCart();
        if (response && response.EC === 0) {
            // toast.success(response.EM);
            setCartList(response.DT);
        }
    };

    const handleCartClose = () => setCartShow(false);
    const handleCartClicked = () => {
        setCartShow(true);
        fetchItem();
    };

    const value = { cartShow, cartList, fetchItem, handleCartClose, handleCartClicked };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
