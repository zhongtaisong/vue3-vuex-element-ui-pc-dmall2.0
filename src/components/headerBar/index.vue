<template>
    <div class="dm_headerBar">
        <topMenu></topMenu>
        <searchArea />
    </div>
</template>

<script>
// 用户菜单
import topMenu from './components/topMenu';
// 搜索区域
import searchArea from './components/searchArea';
export default {
    components: {
        topMenu, 
        searchArea
    }
}
</script>

<style lang="less">
    .dm_headerBar {
        position: sticky;
        left: 0;
        top: 0;
        z-index: 999;
        margin-bottom: 30px;
    }
</style>