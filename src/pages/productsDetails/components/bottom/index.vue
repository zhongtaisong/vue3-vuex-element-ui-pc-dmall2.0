<template>
    <div class="dm_productsDetails_bottom">
        <el-tabs v-model="activeName" @tab-click="tabsChange" :style="{ padding: '0 20px', color: '#666' }">
            <el-tab-pane label="商品介绍" name="introduce">
                <div>
                    <dl class='dm_productsDetails_bottom__parameter'>
                        <dd>
                            <span v-for='item in newParamsList' :key='item.id' :title='item.value'>{{ item.label }}：{{ item.key == 'brandId' ? BRAND_LIST[item.value] : item.value }}</span>
                        </dd>
                    </dl>
                    <el-row>
                        <el-col :span='24' :style="{ textAlign: 'center' }" v-for='(item, index) in detailsPic' :key='index'>
                            <img :src='$url + item' :style="{ width: '750px', height: 'auto' }" /> 
                        </el-col>
                    </el-row>
                </div>
            </el-tab-pane>
            <el-tab-pane label="商品评价" name="comment">
                <List v-for='c in commentList' :key='c.id'
                    :id='c.id'
                    :avatar="c.avatar ? `${$url}${c.avatar}` : ''" 
                    :uname='c.uname'
                    :commentTime='c.commentTime'
                    :content='c.content'
                    :likeNum='c.agree'
                    :dislikeNum='c.disagree'
                    :statusClick='statusClick'
                />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>

export default {
    props: {
        params: {
            type: Object,
            default() {
                return {};
            }
        },
        detailsPic: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            activeName: 'introduce',            
            paramsList: [
                { id: 1, label: '品牌', key: 'brandId', value: '' },
                { id: 2, label: '商品名称', key: 'productName', value: '' },
                { id: 3, label: '商品毛重', key: 'weight', value: '' },
                { id: 4, label: '商品产地', key: 'placeOfOrigin', value: '' },
                { id: 5, label: '系统', key: 'systems', value: '' },
                { id: 6, label: '处理器', key: 'cpu', value: '' },
                { id: 7, label: '厚度', key: 'thickness', value: '' },
                { id: 8, label: '硬盘容量', key: 'disk', value: '' },
                { id: 9, label: '待机时长', key: 'standbyTime', value: '' },
                { id: 10, label: '系列', key: 'series', value: '' },
                { id: 11, label: '裸机重量', key: 'bareWeight', value: '' },
                { id: 12, label: '屏幕尺寸', key: 'screenSize', value: '' },
                { id: 13, label: '显卡型号', key: 'gpu', value: '' },
                { id: 14, label: '特性', key: 'characteristic', value: '' },
                { id: 15, label: '内存容量', key: 'memory', value: '' },
                { id: 16, label: '显存容量', key: 'gpuCapacity', value: '' },
                { id: 17, label: '机身材质', key: 'bodyMaterial', value: '' }
            ],
            BRAND_LIST: this.$tableDic.BRAND_LIST || {},
            commentList: []
        }
    },
    methods: {
        // 赞 /踩 - 操作
        statusClick(id, type, agreeNum, disagreeNum) {
            this.postUpdateCommentData({
                id, type, agreeNum, disagreeNum
            });
        },
        // 监听tab
        tabsChange(tab={}) {
            this.activeName = tab.name;
            tab.name == 'comment' && this.getCurrentCommentData({
                pid: this.params.id
            });
        },
        // 当前商品评价
        async getCurrentCommentData(params={}) {
            const res = await this.$service.getCurrentCommentData(params);
            try {
                if (res.data.code === 200) {
                    const { data=[] } = res.data || {};
                    this.commentList = data;
                }
            } catch (err) {
                console.log(err);
            }
        },
        // 赞 / 踩
        async postUpdateCommentData(params={}) {
            const res = await this.$service.postUpdateCommentData(params);
            try {
                if (res.data.code === 200) {
                    this.getCurrentCommentData({
                        pid: this.params.id
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }
    },
    computed: {
        newParamsList() {
            let params = this.params;
            let paramsList = this.paramsList;
            for(let p in params){
                paramsList.forEach((item, index) => {
                    if( p == item.key ){
                        paramsList[index]['value'] = params[p];
                    }
                });
            }
            return paramsList;
        }
    }
}
</script>

<style lang="less">
    @import './index.less';
</style>