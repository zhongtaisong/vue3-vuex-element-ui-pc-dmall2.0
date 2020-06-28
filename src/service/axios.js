import axios from "axios";
import { Loading, Message } from 'element-ui';
// 设置
import { PUBLIC_URL, BLACK_LIST_PATH } from '@config';

const $axios = axios.create({
    baseURL: PUBLIC_URL,
    timeout: 60 * 1000,
    withCredentials: true,
    headers: { 
        type: 'vue',
        uname: sessionStorage.getItem('uname') || localStorage.getItem('uname') || '',
        token: sessionStorage.getItem('token') || ''
    }
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
        const { config: { url }, code, request, response } = error || {};
        if( code == 'ECONNABORTED' ){
            Message({
                type: 'error',
                message: `${ url } 请求超时！`
            });
            loadingInstance && loadingInstance.close();
        }
        if (error.response) {
            console.log('22222222222')
            const { pathname } = window.location || {};
            const { data, status, request: { responseURL } } = error.response || {};
            loadingInstance && loadingInstance.close();
            switch (status) {
                case 401:
                    Message({
                        type: 'error',
                        message: '当前操作没有权限！'
                    });
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