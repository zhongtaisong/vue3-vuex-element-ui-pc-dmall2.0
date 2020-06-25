<template>
    <div class="common_width dm_settlementPage">
        <TableTitle title='结算页'>
            <div>（当前共有 <i>{{ getTotalNum }}</i> 件商品正在结算）</div>
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
                    <router-link v-if="c.prop == 'description'" class='title_style' :to="{ name: 'productsDetails', params: { id: scope.row.pid } }">
                        <span :title='scope.row.description'>{{ scope.row.description }}</span>
                        <span class='ellipsis'>规格：{{ scope.row.spec }}</span>
                    </router-link>
                    <span v-if="c.prop == 'price' || c.prop == 'totalprice'">￥{{ c.prop == 'price' ? scope.row['price'] : c.prop == 'totalprice' ? scope.row['totalprice'] : 0 | keepTwoDecimalPlaces }}</span>
                    <span v-if="c.prop == 'num'">x{{ scope.row.num }}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-row class='dm_settlementPage__pay'>
            <el-col :span='24'>
                <div class="dm_settlementPage__pay--name">
                    <i>更换收货人：</i>
                    <el-select placeholder="请选择" size='mini' v-model='checkedName'>
                        <el-option
                            v-for="item in getName"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </div>
                <div>
                    <i>收货人：</i>
                    <span>{{ getNewAddressObj[0] || '' }}</span>
                </div>
                <div>
                    <i>收货地址：</i>
                    <span>{{ getNewAddressObj[2] || '' }}</span>
                </div>
                <div>
                    <i>联系电话：</i>
                    <span>{{ getNewAddressObj[1] || '' }}</span>    
                </div>
                <div class="dm_settlementPage__pay--price">
                    <i>总金额：</i>
                    <span>￥{{ getTotalPrice | keepTwoDecimalPlaces }}</span>
                </div>
                <div class="dm_settlementPage__pay--price">
                    <i>应付金额：</i>
                    <span>￥{{ getTotalPrice | keepTwoDecimalPlaces }}</span>
                </div>
                <div class='dm_settlementPage__pay--submit'>
                    <el-button type='primary' round @click="handleSubmitOrders">提交订单</el-button>
                </div>
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
            address: [],
            checkedName: '',
            reqParams: {
                pid: [],
                aid: null,
                num: 1,
                nums: '',
                totalprice: 0
            }
        }
    },
    mounted() {
        try {
            const { id, type } = this.$route.query || {};
            this.postSettlementData({
                id, type
            });
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        // 提交订单 - 操作
        handleSubmitOrders() {
            let arr = this.getName.filter(item => item.value == this.checkedName) || [];
            const { id } = arr[0] || {};
            this.reqParams['aid'] = id;
            this.postAddOrderData({
                uname: sessionStorage.getItem('uname'),
                ...this.reqParams
            });
        },
        // 查询 - 收货地址、商品详情
        async postSettlementData(params = {}) {
            const res = await this.$service.postSettlementData({
                uname: sessionStorage.getItem('uname'),
                ...params
            });
            try {
                if (res.data.code === 200) {
                    const { address=[], productsInfo=[] } = res.data.data || {};
                    this.tableData = productsInfo;
                    this.address = address;

                    // 获取 - 默认收货人
                    let data = address.filter(item => item.isDefault == 1 ) || [];
                    const { name, phone, region, detail } = data[0] || {};
                    this.checkedName = `${name} / ${phone} / ${region}${detail}`;

                    this.reqParams['pid'] = productsInfo.map(item => item.pid);
                    this.reqParams['num'] = productsInfo.reduce((total, item, index, arr) => total + item.num, 0);
                    this.reqParams['nums'] = productsInfo.map(item => item.num).toString();
                    this.reqParams['totalprice'] = productsInfo.reduce((total, item, index, arr) => total + item.totalprice, 0);
                }
            } catch (err) {
                console.log(err);
            }
        },
        // 提交订单
        async postAddOrderData(params = {}) {
            const res = await this.$service.postAddOrderData(params);
            try{
                if( res.data.code === 200 ){
                    const { data} = res.data || {};
                    if(data) {
                        this.$store.dispatch('getCartNumData');
                        this.$router.replace({ name: 'orderDetails', query: { id: data } });
                    }
                }
            }catch(err) {
                console.log(err);
            }
        }
    },
    computed: {
        getName() {
            let address = this.address;
            let data = address.map(item => {
                return {
                    id: item.id,
                    label: `${item.name} / ${item.phone} / ${item.region}${item.detail}`,
                    value: `${item.name} / ${item.phone} / ${item.region}${item.detail}`
                }
            })
            return data;
        },
        getNewAddressObj() {
            let checkedName = this.checkedName;
            return checkedName.split(' / ') || [];
        },
        getTotalNum() {
            let tableData = this.tableData;
            let num = tableData.reduce((total, item, index, arr) => {
                return total + item.num;
            }, 0)
            return num;
        },
        getTotalPrice() {
            let tableData = this.tableData;
            let totalprice = tableData.reduce((total, item, index, arr) => {
                return total + item.totalprice;
            }, 0)
            return totalprice;
        }
    }
}
</script>

<style lang="less">
    @import './index.less';
</style>