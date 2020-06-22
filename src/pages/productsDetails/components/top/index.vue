<template>
    <div class="dm_productsDetails_top">
        <el-row>
            <el-col :span='8'>
                <dl>
                    <dt>
                        <img v-if='imgList[actionIndex]' :src='$url + imgList[actionIndex]' alt='loading...' />
                    </dt>
                    <dd>
                        <div v-for='(img, index) in imgList' :key='index' @mouseover='handleTogglePic(index)' :class="actionIndex === index ? 'active' : ''">
                            <img :src='$url + img' alt='' />
                        </div>
                    </dd>
                </dl>
            </el-col>
            <el-col :span='16'>
                <div class="products_title" :title="basicInfo.description || '-'">{{ (basicInfo.description || '敬请期待~~~') | threeLineEllipsis(86) }}</div>
                <h3 class='ellipsis' :title='basicInfo.copywriting || "-"'>{{ basicInfo.copywriting || "敬请期待~~~" }}</h3>
                <div class='price'>售价：
                    <div>
                        <span class='unit'>￥</span>
                        {{ basicInfo.price && !isNaN(basicInfo.price) ? Number(basicInfo.price).toFixed(2) : 0 }}
                    </div>
                </div>
                <el-row class='Specifications'>
                    <el-col :span='2'>规格：</el-col>
                    <el-col :span='22'>
                        <el-row>
                            <el-col :span='11' v-for='item in specs' :key='item.id' :class="basicInfo.id === item.id ? 'active' : ''" @click.native='handleToggleSpecs(item.id)'>
                                <div class="ellipsis" :title="item.spec || '-'">{{ item.spec || '-' }}</div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row class='Number'>
                    <el-col :span='2'>数量：</el-col>
                    <el-col :span='22'>
                        <el-input-number v-model="num" @change="watchNumber" :min="1" :max="99" size='small'></el-input-number>
                    </el-col>
                </el-row>
                <el-row class='handleButton'>
                    <el-col :span='2' :style='{ height: "1px" }'></el-col>
                    <el-col :span='22'>
                        <el-button type="primary" plain @click="immediatePurchase">立即购买</el-button>
                        <el-button type="primary" @click="handleAddCart">加入购物车</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>

export default {
    props: {
        basicInfo: {
            type: Object,
            default() {
                return {};
            }
        },
        imgList: {
            type: Array,
            default() {
                return [];
            }
        },
        specs: {
            type: Array,
            default() {
                return [];
            }
        },
        getDetailsData: Function,
        postAddCartData: Function
    },
    data() {
        return {
            actionIndex: 0,
            num: 1,
        }
    },
    methods: {
        // 立即购买
        immediatePurchase() {
            // let { basicInfo={} } = this.props;
            // const { id } = basicInfo;
            // id && this.props.history.push({
            //     pathname: '/views/products/cart/settlement',
            //     state: {
            //         id: [id],
            //         num: this.state.num,
            //         type: 'detail'
            //     }
            // });
        },
        // 加入购物车
        handleAddCart() {
            const { id, price } = this.basicInfo;
            this.postAddCartData([{
                pid: id,
                num: this.num,
                totalprice: price ? Number(price) * this.num : price
            }]);
        },
        // 数量
        watchNumber(value) {
            this.num = value;
        },
        // 选择预览图片
        handleTogglePic(index) {
            this.actionIndex = index;
        },
        // 选择规格
        handleToggleSpecs(id) {
            if( id ){
                this.$router.push({ name: 'productsDetails', params: { id } });
                this.getDetailsData({ id });
            }
        }

    }
}
</script>

<style lang="less">
    @import './index.less';
</style>