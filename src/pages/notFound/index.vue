<template>
    <div class="common_width dm_notFound">
        <div class='dm_notFound__title'>401</div>
        <div class='dm_notFound__content'>很抱歉，您无权访问当前页面！</div>
        <div class='dm_notFound__btn'>
            <el-button type="primary" round size="mini" @click.native="$router.replace('/')">回到首页</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    }
}
</script>

<style lang="less">
    @import './index.less';
</style>