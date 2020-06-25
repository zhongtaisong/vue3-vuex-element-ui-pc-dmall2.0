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
                    <a @click="postLogoutData">退出登录</a>
                </template>
                <template v-else>
                    <router-link to='/login'>登录</router-link>
                    <router-link to='register'>注册</router-link>
                </template>
                <router-link to='/myOrder'>我的订单</router-link>
                <router-link to='/myCollection'>商品收藏</router-link>
                <a>用户中心</a>
            </el-col>
      </el-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            uname: sessionStorage.getItem('uname'),
            token: sessionStorage.getItem('token')
        }
    },
    methods: {
        // 退出登录
        async postLogoutData() {
            const res = await this.$service.postLogoutData();
            try{
                if( res.data.code === 200 ){
                    sessionStorage.removeItem('uname');
                    sessionStorage.removeItem('token');
                    this.uname = null;
                    this.token = null;
                }
            }catch(err) {
                console.log(err);
            }
        }

    }
}
</script>

<style lang="less">
    @import "./index.less";
</style>