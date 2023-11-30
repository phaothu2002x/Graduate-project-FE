import { createContext, useEffect, useState } from 'react';
import { fetchItemInCart } from '~/services/cartService';
import { useContext } from 'react';
import { UserContext } from '~/context/UserContext';
const CartContext = createContext();

const CartProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const [cartShow, setCartShow] = useState(false);
    const [cartList, setCartList] = useState([]);
    const [itemsInCart, setItemInCart] = useState(0);

    const fetchItem = async () => {
        let response = await fetchItemInCart();
        // console.log(response);
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
        if (user && user.isAuthenticated === true) {
            fetchItem();
        }
    }, []);

    const handleCartClose = () => {
        setCartShow(false);
        fetchItem();
    };
    const handleCartClicked = () => {
        setCartShow(true);
        fetchItem();
    };

    const value = { cartShow, setCartShow, cartList, itemsInCart, fetchItem, handleCartClose, handleCartClicked };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export { CartContext, CartProvider };
