<template>
    <div class="dm_card">
        <el-row>
            <el-col :span='Math.floor(24 / num)' v-for="s in list" :key='s.id' :style='{ width }'>
                <el-card shadow="never">
                    <el-image class='dm_card_img' :src="s.mainPicture" :title="s.productName" :width='imgWidth' @click="$router.push({ name: 'productsDetails', params: { id: s.id } })"></el-image>
                    <div class='dm_card_text'>
                        <p>
                            <span class="unit">￥</span>
                            {{ s.price | keepTwoDecimalPlaces }}
                        </p>
                        <div class="description" :title="s.description"  @click="$router.push({ name: 'productsDetails', params: { id: s.id } })">{{ s.description | threeLineEllipsis(len) }}</div>
                        <slot :num='s.num' :price='s.price' :id='s.id' ></slot>
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
        },
        len: {
            type: Number,
            default: 50
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>