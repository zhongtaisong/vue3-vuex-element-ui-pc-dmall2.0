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

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: ['首页']
    },
    {
        path: '/products',
        name: 'products',
        component: Products,
        meta: ['杂货铺']
    },
    {
        path: '/products/detail/:id',
        name: 'productsDetails',
        component: ProductsDetails,
        meta: ['商品详情']
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: ['登录']
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: ['注册']
    },
    {
        path: '/shoppingCart',
        name: 'shoppingCart',
        component: ShoppingCart,
        meta: ['购物车']
    },
    {
        path: '/searchResults',
        name: 'searchResults',
        component: SearchResults,
        meta: ['搜索结果']
    },
    {
        path: '/myOrder',
        name: 'myOrder',
        component: MyOrder,
        meta: ['我的订单']
    },
    {
        path: '/myCollection',
        name: 'myCollection',
        component: MyCollection,
        meta: ['我的收藏']
    },
    {
        path: '/settlementPage',
        name: 'settlementPage',
        component: SettlementPage,
        meta: [{
            requiresAuth: true
        }, '结算页']
    },
    {
        path: '/orderDetails',
        name: 'orderDetails',
        component: OrderDetails,
        meta: ['订单详情']
    },
    {
        path: '/myComment',
        name: 'myComment',
        component: MyComment,
        meta: ['我的评价']
    },
    {
        path: '/message',
        name: 'message',
        component: Message,
        meta: ['留言']
    },
    {
        path: '/userCenter',
        name: 'userCenter',
        component: UserCenter,
        meta: ['用户中心']
    },
    {
        path: '/notFound',
        name: 'notFound',
        component: NotFound,
        meta: ['400', '401']
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