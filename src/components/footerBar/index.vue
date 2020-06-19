<template>
    <div class="dm_footerBar">
        <el-row class='common_width'>
            <el-col :span='8' v-for='l in list' :key='l.id' >
                <i>{{ l.title }}</i>
                <a target='_blank' v-for='item in l.content' :href='item.url' :key='item.cid'>{{ item.name }}</a>
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
                { id: 1, title: 'demoMall', 
                    content: [
                        { cid: 1, url: '/views/web', name: '网站说明' },
                        { cid: 2, url: '/views/message', name: '留言' }
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