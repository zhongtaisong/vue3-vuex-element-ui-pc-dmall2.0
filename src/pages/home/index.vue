<template>
    <div class="dm_home">
        <CarouselBox />
        <HotThisWeek />
    </div>
</template>

<script>
// banner
import CarouselBox from "./components/carouselBox";
// 本周热门
import HotThisWeek from "./components/hotThisWeek";

export default {
    name: "Home",
    components: {
        CarouselBox,
        HotThisWeek
    }
};
</script>

<style lang="less">
    .dm_home {
        margin: 0 0 30px;
    }
</style>