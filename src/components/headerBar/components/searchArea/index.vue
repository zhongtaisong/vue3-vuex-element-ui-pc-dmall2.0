<template>
    <div class="dm_headerBar_searchArea">
        <el-row class='common_width'>
            <el-col :span='4' class='logo' title='首页' :style='logoStyle'></el-col>
            <el-col :span='16'>
                <router-link to='/' exact-active-class='active'>首页</router-link>
                <router-link to='/products' active-class='active'>杂货铺</router-link>
                <a>网站说明</a>
                <a>留言</a>
            </el-col>
            <el-col :span='4'>
                <el-button type="primary" icon="el-icon-search" class='search'></el-button>
                <el-badge :value='66' :max='99'>
                    <el-button icon='el-icon-shopping-cart-2' type="primary" class='cart'>我的购物车</el-button>
                </el-badge>
            </el-col>
        </el-row>
    </div>
</template>

<script>
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
            }
        }
    },
    mounted() {
        console.log('666666', this)
    }
}
</script>

<style lang="less">
    @import './index.less';
</style>