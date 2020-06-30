import Vue from 'vue';
import Vuex from 'vuex';
// http
import service from '@service';
// 登录
import login from './modules/login.js';
// 路由
import router from '@router';

Vue.use(Vuex);

const state = {
    cartNum: 0,
    searchResult: [],
    uname: null,
    token: null
};

const mutations = {
    // 加入购物车
    async postAddCartData(state, params={}) {
        const res = await service.postAddCartData({
            uname: sessionStorage.getItem('uname'), 
            ...params
        });
        try {
            if (res.data.code === 200) {
                mutations.getCartNumData(state);
            }
        } catch (err) {
            console.log(err);
        }
    },
    // 查询 - 购物车商品数量
    async getCartNumData(state) {
        let uname = sessionStorage.getItem('uname') || localStorage.getItem('uname');
        if(!uname) return;
        const res = await service.getCartNumData({ uname });
        try {
            if (res.data.code === 200) {
                state.cartNum = res.data.data || 0;
            }
        } catch (err) {
            console.log(err);
        }
    },
    // 获取搜索结果
    getSearchResult(state, value=[]) {
        state.searchResult = value;
    },
    // 获取uname
    getUname(state, value) {
        state.uname = value;
    },
    // 获取token
    getToken(state, value) {
        state.token = value;
    },    
    // 退出登录
    async postLogoutData(state) {
        const res = await service.postLogoutData();
        try{
            if( res.data.code === 200 ){
                sessionStorage.removeItem('uname');
                sessionStorage.removeItem('token');
                state.uname = null;
                state.token = null;
                
                const { path, meta={} } = router.currentRoute || {};
                if(meta.requiresAuth) {
                    setTimeout(() => {
                        router.push({ name: 'login', query: {
                            from: path
                        } })
                    }, 1000)
                }
            }
        }catch(err) {
            console.log(err);
        }
    }
};

const actions = {
    handleAddCart(context, params) {
        context.commit('postAddCartData', params)
    },
    getCartNumData(context) {
        context.commit('getCartNumData');
    },
    getSearchResult(context, value) {
        context.commit('getSearchResult', value);
    },
    getUname(context, value) {
        context.commit('getUname', value);
    },
    getToken(context, value) {
        context.commit('getToken', value);
    },
    postLogoutData(context) {
        context.commit('postLogoutData');
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        login
    }
})