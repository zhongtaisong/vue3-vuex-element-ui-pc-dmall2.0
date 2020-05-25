import Vue from 'vue';
import Router from 'vue-router';

const Home = () => import('@pages/home');
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
    name: 'Home',
    component: Home,
    meta: ['哈哈哈']
  }
];

export default new Router({
  routes
});