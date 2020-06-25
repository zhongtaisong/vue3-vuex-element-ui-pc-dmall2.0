<template>
    <div class="common_width dm_orderDetails">
        <TableTitle title='结算页'>
            <div>（ 订单号： <i>{{ orderInfo.ordernum }}</i> ）</div>
        </TableTitle>
        <el-table
            :data="tableData"
            max-height="386"
            border
            style="width: 100%"
            row-key='id'
            size='small'
        >
            <el-table-column v-for='c in columns' :key='c.id'
                :prop="c.prop"
                :label="c.label"
                :width="c.width"
                align='center'
            >
                <template slot-scope="scope">
                    <img v-if="c.prop == 'mainPicture'" class='imgs_style' :src="$url + scope.row.mainPicture" />
                    <router-link v-if="c.prop == 'description'" class='title_style' :to="{ name: 'productsDetails', params: { id: scope.row.id } }">
                        <span :title='scope.row.description'>{{ scope.row.description }}</span>
                        <span class='ellipsis'>规格：{{ scope.row.spec }}</span>
                    </router-link>
                    <span v-if="c.prop == 'price' || c.prop == 'totalprice'">￥{{ c.prop == 'price' ? scope.row['price'] : c.prop == 'totalprice' ? scope.row['totalprice'] : 0 | keepTwoDecimalPlaces }}</span>
                    <span v-if="c.prop == 'num'">x{{ scope.row.num }}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-row class='dm_orderDetails__pay'>
            <el-col :span='12'>
                <dl>
                    <dt>收货人信息</dt>
                    <dd>
                        <i>收货人：</i>
                        <span>{{ address.name || '-' }}</span>
                    </dd>
                    <dd>
                        <i>所在地区：</i>
                        <span>{{ address.region || '-' }}</span>
                    </dd>
                    <dd>
                        <i>详情地址：</i>
                        <span>{{ address.detail || '-' }}</span>   
                    </dd>
                    <dd>
                        <i>联系电话：</i>
                        <span>{{ address.phone || '-' }}</span>   
                    </dd>
                </dl>
            </el-col>
            <el-col :span='12'>
                <dl>
                    <dt>付款信息</dt>
                    <dd>
                        <i>付款时间：</i>
                        <span>{{ orderInfo.submitTime || '-' }}</span>
                    </dd>
                    <dd>
                        <i>商品总数：</i>
                        <span>{{ orderInfo.num || '-' }} 件</span>
                    </dd>
                    <dd>
                        <i>商品总额：</i>
                        <span>￥{{ orderInfo.totalprice || '-' }}</span>
                    </dd>
                    <dd>
                        <i>应支付金额：</i>
                        <span>￥{{ orderInfo.totalprice || '-' }}</span>
                    </dd>
                </dl>
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
            address: {},
            orderInfo: {}
        }
    },
    mounted() {
        try {
            const { id } = this.$route.query || {};
            this.getOrderDetailData({ id });
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        // 查询 - 订单详情
        async getOrderDetailData(params = {}) {
            const res = await this.$service.getOrderDetailData(params);
            try {
                if (res.data.code === 200) {
                    const { address={}, productsInfo=[], orderInfo={} } = res.data.data || {};
                    this.tableData = productsInfo;
                    this.orderInfo = orderInfo;
                    this.address = address;
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