import { createContext, useEffect, useState } from 'react';
import { fetchItemInCart } from '~/services/cartService';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartShow, setCartShow] = useState(false);
    const [cartList, setCartList] = useState([]);
    const [itemsInCart, setItemInCart] = useState(0);

    const fetchItem = async () => {
        let response = await fetchItemInCart();
        if (response && response.EC === 0) {
            // toast.success(response.EM);
            let data = response.DT;
            setCartList(data);
            setItemInCart(
                data.reduce((acc, currVal) => {
                    return acc + currVal.quantity;
                }, 0),
            );
        }
    };

    useEffect(() => {
        fetchItem();
    }, []);

    const handleCartClose = () => {
        setCartShow(false);
        fetchItem();
    };
    const handleCartClicked = () => {
        setCartShow(true);
        fetchItem();
    };

    const value = { cartShow, cartList, itemsInCart, fetchItem, handleCartClose, handleCartClicked };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
