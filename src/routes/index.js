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
import ManageOrder from '~/pages/ManageOrder/manageOrder';
import Profile from '~/pages/Profile/profile';
import UserOrder from '~/pages/UserOrder/userOrder';
import AboutPage from '~/pages/About/about';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/product/:id', component: ProductDetail },
    { path: '/about', component: AboutPage },
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
    { path: `/manage-order`, component: ManageOrder },
    { path: `/profile/:profile`, component: Profile },
    { path: `/profile/orders`, component: UserOrder },
    { path: '/cart', component: Cart },
];

// export default CheckRoute;
export { publicRoutes, privateRoutes };
