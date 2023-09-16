import Home from '~/pages/Home';
import Product from '~/pages/Product';
import Cart from '~/pages/Cart';
import SignUp from '~/pages/SignUp';
import Login from '~/pages/Login';
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
