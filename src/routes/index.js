import Home from '~/pages/Home';
import Shop from '~/pages/Shop';
import About from '~/pages/About';
import Cart from '~/pages/Cart';
import Contact from '~/pages/Contact';
import Order from '~/pages/Order';
import Profile from '~/pages/Profile';
import PayMent from '~/pages/PayMent';
import PayMethod from '~/pages/PayMent/PayMethod';

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
        path: '/payment',
        component: PayMent,
        layout: null,
    },
    {
        path: '/paymethod',
        component: PayMethod,
        layout: null,
    },
];

// Private Routes
const PrivateRoutes = [
    {
        path: '/order',
        component: Order,
    },
    {
        path: '/profile',
        component: Profile,
    },
    {
        path: '/payment',
        component: PayMent,
        layout: null,
    },
    {
        path: '/paymethod',
        component: PayMethod,
        layout: null,
    },
];

export { PublicRoutes, PrivateRoutes };
