import $axios from './axios';

export default class Http {

    static request(method='get', url, data={}) {
        return $axios[method]( 
            url, 
            method == 'get' ? {
                params: {...data}
            } : {...data} 
        ).then(res => {
            return this.isSuccess(res);
        })
    }

    // 判断请求是否成功
    static isSuccess(res) {
        if (res.data && res.data.code == 200) {
            return res || {};
        } else {
            this.requestException(res);
        }
    }

    // 处理异常
    static requestException(res) {
        const error = new Error(res.data && res.data.msg);
        error.response = res.data;
        throw error
    }
    
    // 处理 get 请求
    static get(url, data) {
        return this.request('get', url, data)
    }
    
    // 处理 put 请求
    static put(url, data) {
        return this.request('put', url, data)
    }
    
    // 处理 post 请求
    static post(url, data) {
        return this.request('post', url, data)
    }
    
    // 处理 patch 请求
    static patch(url, data) {
        return this.request('patch', url, data)
    }
    
    // 处理 delete 请求
    static delete(url, data) {
        return this.request('delete', url, data)
    }

}