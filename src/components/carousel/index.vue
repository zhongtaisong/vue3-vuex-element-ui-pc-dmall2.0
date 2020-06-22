<template>
    <div>
        <el-carousel v-if='isOnly' :autoplay='autoplay' :interval='interval' :arrow='arrow' :indicator-position='indicatorPosition' :height="height">
            <el-carousel-item v-for="(l, index) in list" :key="l.id || index">
                <router-link :to="{ name: 'productsDetails', params: { id: l.id } }">
                    <img :src="l.bannerPic" alt :title="l.description" width="100%" />
                </router-link>
            </el-carousel-item>
        </el-carousel>
        <el-carousel v-else :autoplay='autoplay' :interval='interval' :arrow='arrow' :indicator-position='indicatorPosition' :height="height" @change="change">
            <el-carousel-item v-for="(c, cIndex) in computedPageNum" :key="c.id || cIndex">
                <el-row type='flex' justify='space-between'>
                    <el-col :span='Math.floor(24 / num)' v-for="(s, sIndex) in sliceList" :key='s.id || sIndex'>
                        <el-card :body-style="{ cursor: 'pointer' }" :title='s.description' shadow="never"
                            @click.native="$router.push({ name: 'productsDetails', params: { id: s.id } })"
                        >
                            <img :src="s.mainPicture" alt :title="s.description" />
                            <div>
                                <span>{{ s.productName }}</span>
                                <div class="description">{{ s.description }}</div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-carousel-item>
        </el-carousel>
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
        isOnly: {
            type: Boolean,
            default: true
        },
        autoplay: {
            type: Boolean,
            default: true
        },
        interval: {
            type: [String, Number],
            default: 3000
        },
        arrow: {
            type: String,
            default: 'hover'
        },
        indicatorPosition: String,
        height: String,
        num: {
            type: Number,
            default: 3
        },
        a: String
    },
    data() {
        return {
            cIndex: 0
        };
    },
    methods: {
        change(i) {
            this.cIndex = i;
        }
    },
    computed: {
        // 一页展示 3 张图片，重新计算页码
        computedPageNum() {
            return this.list.filter((item, index) => !(index % this.num));
        },
        // 截取数据，一页展示 3 张图片
        sliceList() {            
            return this.list.slice(this.cIndex * this.num, this.cIndex * this.num + this.num);
        }
    }
};
</script>

<style lang="less">
</style>