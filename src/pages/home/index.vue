<template>
  <div class="dm_Home">
      <CarouselBox />
      <!-- <HotThisWeek {...this.props} /> -->
  </div>
</template>

<script>
  // 走马灯
  import CarouselBox from './components/CarouselBox';
  // 本周热门
  // import HotThisWeek from './components/HotThisWeek';

  export default {
    name: 'Home',
    components: {
      CarouselBox
    }
  }
</script>

<style lang="less" scoped>

</style>