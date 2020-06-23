<template>
    <div class="dm_productsDetails">
        <div class="common_width">
            <Top :basicInfo='basicInfo' :imgList='imgList' :specs='specs' :getDetailsData='getDetailsData' />
            <Bottom :params='params' :detailsPic='detailsPic' />
        </div>
    </div>
</template>

<script>
// 上半部分
import Top from './components/top'
// 下半部分
import Bottom from './components/bottom'

export default {
    components: {
        Top, Bottom
    },
    data() {
        return {
            id: null,
            basicInfo: {},
            detailsPic: [],
            imgList: [],
            params: {},
            specs: []
        }
    },
    mounted() {
        try {
            const { id } = this.$route.params || {};
            this.id = id;
            this.getDetailsData({ id });
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        // 获取商品详情
        async getDetailsData(params={}) {
            const res = await this.$service.getDetailsData(params);
            try {
                if (res.data.code === 200) {
                    const { basicInfo, imgList, params, specs, detailsPic } = res.data.data || {};
                    this.basicInfo = basicInfo;
                    this.imgList = imgList;
                    this.params = params;
                    this.specs = specs;
                    this.detailsPic = detailsPic;
                }
            } catch (err) {
                console.log(err);
            }
        }

    }
}
</script>

<style lang="less">
    @import './index.less';
</style>