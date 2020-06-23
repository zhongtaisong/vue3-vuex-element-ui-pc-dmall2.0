<template>
    <div class="common_width dm_myCollection">
        <TableTitle title='宝贝收藏'>
            <div>（当前共有 <i>{{ getTotal }}</i> 件藏品）</div>
        </TableTitle>
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
                    <span v-if="c.prop == 'price' || c.prop == 'totalprice'">￥{{ c.prop == 'price' ? scope.row['price'] : c.prop == 'totalprice' ? scope.row['totalprice'] : 0 | keepTwoDecimalPlaces }}</span>
                    <span v-if="c.prop == 'num'">{{ scope.row.num }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="operation"
                label="操作"
                width="148"
                align='center'
            >
                <template slot-scope="scope">             
                    <div class='operation'>
                        <span @click="deleteCartClick(scope.row.id)">删除</span>
                        <span @click="addCollectionClick(scope.row.id)">加入购物车</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <el-row class="dm_myCollection__btn">
            <el-col :span='12' class='left'>
                <el-button plain size='small' @click="batchClick('del')">批量删除</el-button>
                <el-button plain size='small' @click="batchClick('col')">批量加入购物车</el-button>
            </el-col>
            <el-col :span='12' class='right'>
                <span class='num'>已选择<i>{{ getTotalNum }}</i>件商品</span>
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
        this.getAllCollectionData();
    },
    methods: {
        // 批量 删除/加入购物车
        batchClick(_this) {
            let selection = this.selection;
            let ids = selection.map(item => item.id);
            let obj = {
                del: () => {
                    if( !selection.length ) {
                        this.$message({
                            message: '请选择需要删除的商品！',
                            type: 'warning'
                        });
                    }else{
                        this.deleteCartClick(ids);
                    }
                },
                col: () => {
                    if( !selection.length ) {
                        this.$message({
                            message: '请选择需要加入购物车的商品！',
                            type: 'warning'
                        });
                    }else{
                        this.addCollectionClick(ids);
                    }
                }
            };
            obj[_this]();
        },
        // 删除 - 操作
        deleteCartClick(id) {
            this.$confirm('此商品确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.postDeleteCollectionData({
                    ids: Array.isArray(id) ? id : [id]
                });
            }).catch(() => {
                return;
            })
        },
        // 加入购物车 - 操作
        addCollectionClick(id) {
            this.$confirm('此商品确认加入购物车?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.postAddCollectionData({
                    ids: Array.isArray(id) ? id : [id]
                });
            }).catch(() => {
                return;
            })
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
        // 查询宝贝收藏
        async getAllCollectionData() {
            const res = await this.$service.getAllCollectionData({
                uname: sessionStorage.getItem('uname'),
                collection: 1
            });
            try {
                if (res.data.code === 200) {
                    const { data=[] } = res.data || {};
                    this.tableData = data;
                    this.selection = [];
                    this.row = {};
                }
            } catch (err) {
                console.log(err);
            }
        },
        // 加入购物车
        async postAddCollectionData(params = {}) {
            const res = await this.$service.postAddCollectionData({
                uname: sessionStorage.getItem('uname'),                
                collection: 0,
                ...params
            });
            try {
                if (res.data.code === 200) {
                    this.getAllCollectionData();
                    this.$store.dispatch('getCartNumData');
                }
            } catch (err) {
                console.log(err);
            }
        },
        // 删除
        async postDeleteCollectionData(params = {}) {
            const res = await this.$service.postDeleteCollectionData({
                uname: sessionStorage.getItem('uname'),
                ...params
            });
            try {
                if (res.data.code === 200) {
                    this.getAllCollectionData();
                }
            } catch (err) {
                console.log(err);
            }
        }
    },
    computed: {
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