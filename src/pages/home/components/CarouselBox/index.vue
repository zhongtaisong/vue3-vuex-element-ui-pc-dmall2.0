<template>
    <div class="dm_home_carouselBox common_width">
        <div class="dm_home_carouselBox__banner">
            <Carousel :list='bannerList' :autoplay='true' height='400px' />
        </div>
        <div class="dm_home_carouselBox__push">
            <Carousel :list='onepushList' :isOnly='false' :autoplay='true' :interval='8000' indicatorPosition='none' arrow='always' height='140px' />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bannerList: [],
            onepushList: []
        };
    },
    mounted() {
        this.getBannerData();
        this.getOnepushData();
    },
    methods: {
        // 获取banner数据
        async getBannerData() {
            const res = await this.$service.getBannerData();
            try {
                if (res.data.code === 200) {
                    const { data = [] } = res.data || {};
                    data.map(item => {
                        item["bannerPic"] = item["bannerPic"] ? this.$url + item["bannerPic"] : "";
                    });
                    this.bannerList = data;
                }
            } catch (err) {
                console.log(err);
            }
        },
        // 获取单品推广数据
        async getOnepushData() {
            const res = await this.$service.getOnepushData();
            try {
                if (res.data.code === 200) {
                    const { data = [] } = res.data || {};
                    data.map(item => {
                        item["mainPicture"] = item["mainPicture"] ? this.$url + item["mainPicture"] : "";
                    });
                    this.onepushList = data;
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>

<style lang="less">
    @import "./index.less";
</style>