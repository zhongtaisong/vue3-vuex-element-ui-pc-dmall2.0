<template>
  <div class='dm_headerBar_topMenu'>
      <el-row class='common_width'>
            <el-col :span='6'>
                <i class="el-icon-location-outline"></i>
                上海
            </el-col>
            <el-col :span='18'>
                <template v-if='uname && token'>
                    <a>欢迎你，{{ uname }}</a>
                    <a @click="$store.dispatch('postLogoutData')">退出登录</a>
                </template>
                <template v-else>
                    <router-link to='/login'>登录</router-link>
                    <router-link to='register'>注册</router-link>
                </template>
                <router-link to='/myOrder'>我的订单</router-link>
                <router-link to='/myCollection'>商品收藏</router-link>
                <router-link to='/userCenter'>用户中心</router-link>
            </el-col>
      </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {}
    },
    computed: {
        ...mapState({
            uname: state => state.uname,
            token: state => state.token
        })
    }
}
</script>

<style lang="less">
    @import "./index.less";
</style>