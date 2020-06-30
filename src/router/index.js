import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import(/* webpackChunkName: 'home' */ '@pages/home');
const Products = () => import(/* webpackChunkName: 'products' */ '@pages/products');
const ProductsDetails = () => import(/* webpackChunkName: 'productsDetails' */ '@pages/productsDetails');
const Login = () => import(/* webpackChunkName: 'login' */ '@pages/login');
const Register = () => import(/* webpackChunkName: 'register' */ '@pages/register');
const ShoppingCart = () => import(/* webpackChunkName: 'shoppingCart' */ '@pages/shoppingCart');
const SearchResults = () => import(/* webpackChunkName: 'searchResults' */ '@pages/searchResults');
const MyOrder = () => import(/* webpackChunkName: 'myOrder' */ '@pages/myOrder');
const MyCollection = () => import(/* webpackChunkName: 'myCollection' */ '@pages/myCollection');
const SettlementPage = () => import(/* webpackChunkName: 'settlementPage' */ '@pages/settlementPage');
const OrderDetails = () => import(/* webpackChunkName: 'orderDetails' */ '@pages/orderDetails');
const MyComment = () => import(/* webpackChunkName: 'myComment' */ '@pages/myComment');
const Message = () => import(/* webpackChunkName: 'message' */ '@pages/message');
const UserCenter = () => import(/* webpackChunkName: 'userCenter' */ '@pages/userCenter');
const NotFound = () => import(/* webpackChunkName: 'notFound' */ '@pages/notFound');

Vue.use(Router);

// requiresAuth 登录后才能访问
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/products',
        name: 'products',
        component: Products,
        meta: {
            title: '杂货铺'
        }
    },
    {
        path: '/products/detail/:id',
        name: 'productsDetails',
        component: ProductsDetails,
        meta: {
            title: '商品详情'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: '注册'
        }
    },
    {
        path: '/shoppingCart',
        name: 'shoppingCart',
        component: ShoppingCart,
        meta: {
            title: '我的购物车',
            requiresAuth: true
        }
    },
    {
        path: '/searchResults',
        name: 'searchResults',
        component: SearchResults,
        meta: {
            title: '搜索结果'
        }
    },
    {
        path: '/myOrder',
        name: 'myOrder',
        component: MyOrder,
        meta: {
            title: '我的订单',
            requiresAuth: true
        }
    },
    {
        path: '/myCollection',
        name: 'myCollection',
        component: MyCollection,
        meta: {
            title: '我的收藏',
            requiresAuth: true
        }
    },
    {
        path: '/settlementPage',
        name: 'settlementPage',
        component: SettlementPage,
        meta: {
            title: '结算页',
            requiresAuth: true
        }
    },
    {
        path: '/orderDetails',
        name: 'orderDetails',
        component: OrderDetails,
        meta: {
            title: '订单详情',
            requiresAuth: true
        }
    },
    {
        path: '/myComment',
        name: 'myComment',
        component: MyComment,
        meta: {
            title: '我的评价',
            requiresAuth: true
        }
    },
    {
        path: '/message',
        name: 'message',
        component: Message,
        meta: {
            title: '留言'
        }
    },
    {
        path: '/userCenter',
        name: 'userCenter',
        component: UserCenter,
        meta: {
            title: '用户中心',
            requiresAuth: true
        }
    },
    {
        path: '/notFound',
        name: 'notFound',
        component: NotFound,
        meta: {
            title: 'notFound'
        }
    },
    {
        path: '*',
        redirect: '/notFound'     
    }
];

// 解决跳转相同路由，控制台出现报错信息的问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
};

export default new Router({
    routes,
    scrollBehavior(to, from, savedPosition) {
        if( savedPosition ) {
            return savedPosition;
        }else {
            return { x: 0, y: 0 };
        }
    }
});