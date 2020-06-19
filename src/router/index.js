import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import(/* webpackChunkName: 'home' */ '@pages/home');
const Products = () => import(/* webpackChunkName: 'products' */ '@pages/products');
const ProductsDetails = () => import(/* webpackChunkName: 'productsDetails' */ '@pages/productsDetails');
const Login = () => import(/* webpackChunkName: 'login' */ '@pages/login');
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
    }
];

export default new Router({
    routes
});