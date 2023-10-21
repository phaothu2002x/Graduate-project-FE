import Home from '~/pages/Home/home';
import Product from '~/pages/Product/product';
import Cart from '~/pages/Cart';
import Login from '~/pages/Login/login';
import Register from '~/pages/Register/register';
import ProductDetail from '~/pages/ProductDetail/productDetail';
import ManageUser from '~/pages/ManageUser/manageUser';

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
// const CheckPrivateRoute = () => {
//     return <>{result}</>;
// };

const privateRoutes = [{ path: '/manage-user', component: ManageUser }];

// export default CheckRoute;
export { publicRoutes, privateRoutes };
