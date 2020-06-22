import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from '@router';
import md5 from 'js-md5';
import store from './store';
import './plugins/element.js'
// 自定义主题颜色
import './theme/index.css'
// url前缀
import { PUBLIC_URL, PWD_KEY } from "@config";
// 全局公共方法
import utils from '@utils';
// http
import Http from '@service/http.js';
// service
import Service from '@service';

// 导入全局公共组件
import globalComponents from './components';

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.use(globalComponents);

// 注册全局变量
Vue.prototype.$url = PUBLIC_URL;
Vue.prototype.$http = Http;
Vue.prototype.$service = Service;
Vue.prototype.$selectDic = JSON.parse(sessionStorage.getItem('selectDic') || '{}');
Vue.prototype.$tableDic = JSON.parse(sessionStorage.getItem('tableDic') || '{}');
Vue.prototype.$md5 = md5;
Vue.prototype.$pwd_key = PWD_KEY;
Vue.prototype.$utils = utils;

// 保留两位小数
Vue.filter('keepTwoDecimalPlaces', (value, len=2) => {
    if( isNaN(value) ) return 0;
    return value.toFixed(len);
});
// 超出 3 行内容溢出，则显示省略号...
Vue.filter('threeLineEllipsis', (value, len) => {
    if( !value.trim() ) return '';
    return value.length >= len ? `${value.slice(0, len)}...` : value;
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
