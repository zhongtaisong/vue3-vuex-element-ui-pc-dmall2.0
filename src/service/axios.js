import axios from "axios";
import { Loading, Message } from 'element-ui';
import router from '@router';
// 设置
import { PUBLIC_URL, BLACK_LIST_PATH } from '@config';
// 路由拦截
router.beforeEach((to, from, next) => {
    // const { path } = to || {};
    // // 用户名
    // let uname = sessionStorage.getItem('uname') || localStorage.getItem('uname') || '';
    // // token
    // let token = sessionStorage.getItem('token') || '';
    // console.log('666666666666', to, path, uname, token, !uname || !token)
    // if(!(uname && token)) {
    //     next({ name: 'login' });
    // }else {
    //     if( BLACK_LIST_PATH.includes(path) ) {
    //         next({ name: 'login' });
    //     }else if(!WHITE_LIST_PATH.includes(path)) {

    //     }
    //     next()
    // }
    next()
})

// http拦截
const $axios = axios.create({
    baseURL: PUBLIC_URL,
    timeout: 60 * 1000,
    withCredentials: true
});

// loading实例
let loadingInstance;

// 添加请求拦截器
$axios.interceptors.request.use(
    config => {
        loadingInstance = Loading.service({ 
            fullscreen: true,
            background: 'rgba(0, 0, 0, 0.8)',
            text: '加载中'
        });

        // 用户名
        let uname = sessionStorage.getItem('uname') || localStorage.getItem('uname');
        // token
        let token = sessionStorage.getItem('token');
        const headers = {
            type: 'vue'
        };
        if(uname) {
            headers['uname'] = uname;
        }
        if(token) {
            headers['token'] = token;
        }
        config.headers = headers;

        return config;
    }, 
    error => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
$axios.interceptors.response.use(
    response => {
        const { data } = response || {};
        if( data ){
            loadingInstance && loadingInstance.close();
            data.msg && Message({
                type: 'success',
                message: data.msg
            });
        }
        return response;
    }, 
    error => {
        const { config: { url }, code } = error || {};
        if( code == 'ECONNABORTED' ){
            Message({
                type: 'error',
                message: `${ url } 加载超时！`
            });
            loadingInstance && loadingInstance.close();
        }
        if (error.response) {
            const { data, status, request: { responseURL } } = error.response || {};
            loadingInstance && loadingInstance.close();
            switch (status) {
                case 400:
                    Message({
                        type: 'error',
                        message: data.msg
                    });
                    break;
                case 401:
                    Message({
                        type: 'error',
                        message: '很抱歉，尚未登录，无权操作！'
                    });
                    router.push({ name: 'login', query: {
                        from: router.currentRoute.path
                    } })
                    break;
                case 404:
                    Message({
                        type: 'error',
                        message: data.msg || '出错啦！'
                    });
                    break;
                default:
                    Message({
                        type: 'error',
                        message: '网络连接失败，请重试！'
                    });
            }
        }
        loadingInstance && loadingInstance.close();
        return Promise.reject(error);
    }
);

export default $axios;