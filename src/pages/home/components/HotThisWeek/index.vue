<template>
    <div class="dm_home_hotThisWeek">
        <el-row class='title'>热门推荐</el-row>
        <div class='common_width'>
            <div class='hot_content'>
                <Card :list='hotList' :num='num' imgWidth='80%' width='18%' />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {            
            hotList: [],
            num: 5
        }
    },
    mounted() {
        this.getHotData();
    },
    methods: {
        async getHotData() {
            const res = await this.$service.getHotData();
            try {
                if (res.data.code === 200) {
                    const { data = [] } = res.data || {};
                    data.map(item => {
                        item["mainPicture"] = item["mainPicture"] ? this.$url + item["mainPicture"] : "";
                    });
                    this.hotList = data;
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