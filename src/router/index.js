import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import(/* webpackChunkName: 'home' */ '@pages/home');
const Products = () => import(/* webpackChunkName: 'products' */ '@pages/products');
const ProductsDetails = () => import(/* webpackChunkName: 'productsDetails' */ '@pages/productsDetails');
const Login = () => import(/* webpackChunkName: 'login' */ '@pages/login');
const Register = () => import(/* webpackChunkName: 'register' */ '@pages/register');
const ShoppingCart = () => import(/* webpackChunkName: 'shoppingCart' */ '@pages/shoppingCart');
const SearchResults = () => import(/* webpackChunkName: 'searchResults' */ '@pages/searchResults');
// import Products from '@pages/Products';
// import ProductsDetail from '@pages/ProductsDetail';
// import MyShoppingCart from '@pages/MyShoppingCart';
// import SettlementPage from '@pages/SettlementPage';
// import OrderDetails from '@pages/OrderDetails';
// import MyCollection from '@pages/MyCollection';
// import MyEvaluation from '@pages/MyEvaluation';
// import MyOrder from '@pages/MyOrder';
// import WebsiteDescription from '@pages/WebsiteDescription';
// import UserCenter from '@pages/UserCenter';
// import Message from '@pages/Message';
// import BrandList from '@pages/Admin/productsManage/brandList';
// import ProductList from '@pages/Admin/productsManage/productList/list';
// import OrdersList from '@pages/Admin/ordersManage/orderList/list';
// import UsersManageList from '@pages/Admin/usersManage/userList/list';
// import CommentsManageList from '@pages/Admin/commentsManage/commentList/list';
// import AdminList from '@pages/Admin/adminList';
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