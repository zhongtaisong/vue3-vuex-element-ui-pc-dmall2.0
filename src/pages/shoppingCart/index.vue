<template>
    <div class="common_width dm_shoppingCart">
        <el-row class='table_title'>
            <h4>我的购物车</h4>
            <div>（当前购物车共有 <i>{{ getTotal }}</i> 件商品）</div>
        </el-row>
        <el-table
            :data="tableData"
            max-height="386"
            border
            style="width: 100%"
            @select="rowSelection"
            @select-all='rowAll'
            row-key='id'
            size='small'
        >
            <el-table-column
                type="selection"
                width="60"
                align='center'
            ></el-table-column>
            <el-table-column v-for='c in columns' :key='c.id'
                :prop="c.prop"
                :label="c.label"
                :width="c.width"
                align='center'
            >
                <template slot-scope="scope">
                    <img v-if="c.prop == 'mainPicture'" class='imgs_style' :src="$url + scope.row.mainPicture" />
                    <router-link v-if="c.prop == 'description'" class='title_style' :to="{ name: 'productsDetails', params: { id: scope.row.pid } }">
                        <span :title='scope.row.description'>{{ scope.row.description }}</span>
                        <span class='ellipsis'>规格：{{ scope.row.spec }}</span>
                    </router-link>
                    <span v-if="c.prop == 'price' || c.prop == 'totalprice'">{{ scope.row.price | keepTwoDecimalPlaces }}</span>
                    <el-input-number v-if="c.prop == 'num'" controls-position="right" size="small" :min='1' :max=99 :value="scope.row.num" style='width: 100%' @change='numberChange(c.id)'></el-input-number>
                </template>
            </el-table-column>
            <el-table-column
                prop="operation"
                label="操作"
                width="148"
                align='center'
            >
                <template>             
                    <div class='operation'>
                        <span>删除</span>
                        <span>加入收藏</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-row class="dm_shoppingCart__btn">
            <el-col :span='12' class='left'>
                <el-button plain size='small'>批量删除</el-button>
                <el-button plain size='small'>批量加入收藏</el-button>
            </el-col>
            <el-col :span='12' class='right'>
                <span class='num'>已选择<i>{{ getTotalNum }}</i>件商品</span>
                <div>
                    总价：<span>¥{{ getTotalPrice | keepTwoDecimalPlaces }}</span>
                </div>
                <span class='go-pay'>去结算</span>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                { id: 1, prop: 'mainPicture', label: '图片', width: 86 },
                { id: 2, prop: 'description', label: '商品' },
                { id: 3, prop: 'price', label: '单价', width: 136 },
                { id: 4, prop: 'num', label: '数量', width: 119 },
                { id: 5, prop: 'totalprice', label: '小计', width: 136 }
            ],
            tableData: [],
            selection: [],
            row: {}
        }
    },
    mounted() {
        this.getSelectCartData();
    },
    methods: {
        numberChange(id) {
            console.log('5555555', id)
        },
        // 全选
        rowAll(selection) {
            this.selection = selection;
        },
        // 选中行
        rowSelection(selection, row) {
            this.selection = selection;
            this.row = row;
        },
        // 查询购物车
        async getSelectCartData() {
            const res = await this.$service.getSelectCartData({
                uname: sessionStorage.getItem('uname'),
                collection: 0
            });
            try {
                if (res.data.code === 200) {
                    const { data=[] } = res.data || {};
                    this.tableData = data;
                }
            } catch (err) {
                console.log(err);
            }
        },
        // 更新商品数量
        async postUpdateCartNumData() {
            const res = await this.$service.postUpdateCartNumData({
                uname: sessionStorage.getItem('uname'),
                // id, num, totalprice
            });
            try {
                if (res.data.code === 200) {
                    // const { data=[] } = res.data || {};
                    // this.tableData = data;
                }
            } catch (err) {
                console.log(err);
            }
        }
    },
    computed: {
        getTotalPrice() {
            let selection = this.selection;
            let t = selection.reduce((total, item, index, arr) => {
                return total + item.totalprice;
            }, 0)
            return t;
        },
        getTotalNum() {
            let selection = this.selection;
            let num = selection.reduce((total, item, index, arr) => {
                return total + item.num;
            }, 0)
            return num;
        },
        getTotal() {
            let tableData = this.tableData;
            let num = tableData.reduce((total, item, index, arr) => {
                return total + item.num;
            }, 0)
            return num;
        }
    }
}
</script>

<style lang="less">
    @import './index.less';
</style>