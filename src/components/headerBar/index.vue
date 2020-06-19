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
    topMenu, searchArea
  }
}
</script>

<style lang="less">
    .dm_headerBar {
        margin-bottom: 30px;
    }
</style>