import Home from '~/pages/Home/home';
import Product from '~/pages/Product/product';
import Cart from '~/pages/Cart';
import SignUp from '~/pages/SignUp/signUp';
import Login from '~/pages/Login/login';
// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/product', component: Product },
    { path: '/cart', component: Cart },
    { path: '/login', component: Login },
    { path: '/sign-up', component: SignUp },
];

// Private routes

const privateRoutes = [];

export { publicRoutes, privateRoutes };
