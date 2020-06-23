import Vue from 'vue';
import Vuex from 'vuex';
// http
import service from '@service';
// 登录
import login from './modules/login.js';

Vue.use(Vuex);

const state = {
    cartNum: 0,
    searchResult: []
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
        const res = await service.getCartNumData({
            uname: sessionStorage.getItem('uname') || localStorage.getItem('uname')
        });
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