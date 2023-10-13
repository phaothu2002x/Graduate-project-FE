import Home from '~/pages/Home/home';
import Product from '~/pages/Product/product';
import Cart from '~/pages/Cart';
import Login from '~/pages/Login/login';
import Register from '~/pages/Register/register';
import ProductDetail from '~/pages/ProductDetail/productDetail';
// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    { path: '/cart', component: Cart },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/productDetail', component: ProductDetail },
];

// Private routes

const privateRoutes = [];

export { publicRoutes, privateRoutes };
