<template>
  <div class='dm_headerBar_topMenu'>
      <el-row class='common_width'>
            <el-col :span='6'>
                <i class="el-icon-location-outline"></i>
                上海
            </el-col>
            <el-col :span='18'>
                <router-link to='/login'>登录</router-link>
                <router-link to='register'>注册</router-link>
                <a>我的订单</a>
                <a>我的收藏</a>
                <a>用户中心</a>
                <a>商城后台</a>
            </el-col>
      </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
    @import "./index.less";
</style>