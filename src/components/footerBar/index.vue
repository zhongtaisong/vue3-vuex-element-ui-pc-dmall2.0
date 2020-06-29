<template>
    <div class="dm_footerBar">
        <el-row class='common_width'>
            <el-col :span='8' v-for='l in list' :key='l.id' >
                <i>{{ l.title }}</i>
                <div v-for='item in l.content' :key='item.cid'>
                    <router-link v-if='l.id == 1' :to='item.url' >{{ item.name }}</router-link>
                    <a v-else target='_blank' :href='item.url'>{{ item.name }}</a>
                </div>
            </el-col>
        </el-row>
        <div class='copyright'>                    
            <div class='common_width'>demoMall2.0 Vue版本 2020/06/16</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [
                { id: 1, title: 'dMall导航', 
                    content: [
                        { cid: 1, url: '/', name: '首页' },
                        { cid: 2, url: '/products', name: '杂货铺' },
                        { cid: 3, url: '/message', name: '留言' }
                    ]
                },
                { id: 2, title: '框架', 
                    content: [
                        { cid: 1, url: 'https://cn.vuejs.org/', name: 'Vue' },
                        { cid: 2, url: 'https://vuex.vuejs.org/zh/', name: 'VueX' },
                        { cid: 3, url: 'https://element.eleme.io/#/zh-CN', name: 'Element-ui' }
                    ]
                },
                { id: 3, title: '社区', 
                    content: [
                        { cid: 1, url: 'https://juejin.im/', name: '掘金' },
                        { cid: 2, url: 'https://segmentfault.com/', name: 'SegmentFault 思否' },
                        { cid: 3, url: 'https://github.com/', name: 'GitHub' },
                        { cid: 4, url: 'https://www.csdn.net/', name: 'CSDN' }
                    ]
                }
            ]
        }
    }
}
</script>

<style lang="less">
    @import './index.less';
</style>