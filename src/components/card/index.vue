<template>
    <div class="dm_card">
        <el-row>
            <el-col :span='Math.floor(24 / num)' v-for="s in list" :key='s.id' :style='{ width }'>
                <el-card :body-style="{ cursor: 'pointer' }" shadow="never">
                    <img :src="s.mainPicture" alt :title="s.productName" :width='imgWidth' />
                    <div>
                        <span>￥{{ s.price | keepTwoDecimalPlaces }}</span>
                        <div class="description" :title="s.description">{{ s.description | threeLineEllipsis }}</div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        },
        num: {
            type: Number,
            default: 3
        },
        imgWidth: {
            type: String,
            default: '100%'
        },
        width: {
            type: String,
            default: '18%'
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>