import * as common from './common';
import * as home from './home';
import * as products from './products';
import * as productsDetails from './productsDetails';
import * as login from './login';

export default {
    ...common, ...home, ...products, ...productsDetails, ...login
}