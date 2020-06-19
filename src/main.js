import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from '@router';
import './plugins/element.js'
// url前缀
import { PUBLIC_URL } from "@config";
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

// 保留两位小数
Vue.filter('keepTwoDecimalPlaces', (value) => {
    if( isNaN(value) ) return 0;
    return value.toFixed(2);
});
// 超出 3 行内容溢出，则显示省略号...
Vue.filter('threeLineEllipsis', (value) => {
    const len = 50;
    if( !value.trim() ) return '';
    return value.length >= len ? `${value.slice(0, len)}...` : value;
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
