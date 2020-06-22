import * as common from './common';
import * as home from './home';
import * as products from './products';
import * as productsDetails from './productsDetails';
import * as login from './login';
import * as register from './register';
import * as headerBar from './headerBar';
import * as shoppingCart from './shoppingCart';

export default {
    ...common, ...home, ...products, ...productsDetails, ...login, ...register, ...headerBar, ...shoppingCart
}