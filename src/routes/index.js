import Home from '~/pages/Home';
import Shop from '~/pages/Shop';
import About from '~/pages/About';
import Login from '~/pages/Login';
import Cart from '~/pages/Cart';
import Search from '~/pages/Search';
import Contact from '~/pages/Contact';

// Public Routes
const PublicRoutes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/shop',
        component: Shop,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/cart',
        component: Cart,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/contact',
        component: Contact,
    },

    {
        path: '/search',
        component: Search,
    },
];

// Private Routes
const PrivateRoutes = [];

export { PublicRoutes, PrivateRoutes };
