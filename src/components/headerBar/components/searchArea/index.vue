<template>
    <div class="dm_headerBar_searchArea">
        <el-row class='common_width'>
            <el-col :span='4' class='logo' title='首页' :style='logoStyle' @click.native="$router.push('/')"></el-col>
            <el-col :span='11'>
                <router-link to='/' exact-active-class='active'>首 页</router-link>
                <router-link to='/products' active-class='active'>杂货铺</router-link>
                <a>网站说明</a>
                <a>留言</a>
            </el-col>
            <el-col :span='9'>
                <el-input placeholder="搜索商品" v-model="kws" size="small" @keyup.native.enter="getSearchKws">
                    <el-button type='primary' slot="append" icon="el-icon-search" @click="getSearchKws"></el-button>
                </el-input>
                <el-badge :value='cartNum' :max='99'>
                    <el-button icon='el-icon-shopping-cart-2' type="primary" @click.native="$router.push('/shoppingCart')">我的购物车</el-button>
                </el-badge>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapState } from 'vuex';
// logo图片
import logoImg from '@img/logo.png';

export default {
    data() {
        return {
            logoStyle: {
                background: `url(${logoImg}) no-repeat`,
                height: '72px',
                backgroundSize: 'contain',
                backgroundPosition: 'center'
            },
            kws: ''
        }
    },
    methods: {
        // 获取搜索关键字
        getSearchKws() {
            let kws = this.kws.trim();
            if( kws ){
                this.getKwData({ kws });
            }
        },
        // 搜索商品
        async getKwData(params={}) {
            const res = await this.$service.getKwData(params);
            try{
                if( res.data.code === 200 ){
                    // res.data.data && this.setSearchResultList( res.data.data );
                }
            }catch(err) {
                console.log(err);
            }
        }

    },
    computed: {
        ...mapState({
            cartNum: state => state.cartNum
        })
    }
}
</script>

<style lang="less">
    @import './index.less';
</style>