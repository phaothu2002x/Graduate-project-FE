import Home from '~/pages/Home/home';
import Product from '~/pages/Product/product';
import Cart from '~/pages/Cart';
import Login from '~/pages/Login/login';
import Register from '~/pages/Register/register';
import ProductDetail from '~/pages/ProductDetail/productDetail';
import ManageUser from '~/pages/ManageUser/manageUser';
import ManageProduct from '~/pages/ManageProduct/manageProduct';
import CreateProduct from '~/pages/ManageProduct/CreateProduct/createProduct';
import UpdateProduct from '~/pages/ManageProduct/UpdateProduct/updateProduct';
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

const privateRoutes = [
    { path: '/manage-user', component: ManageUser },
    { path: '/manage-products', component: ManageProduct },
    { path: '/manage-products/create', component: CreateProduct },
    { path: `/manage-products/update/:id`, component: UpdateProduct },
];

// export default CheckRoute;
export { publicRoutes, privateRoutes };
