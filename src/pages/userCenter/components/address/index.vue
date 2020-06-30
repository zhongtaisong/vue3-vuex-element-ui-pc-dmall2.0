<template>
    <div class="dm_userCenter__content--common dm_userCenter_address">
        <el-row>
            <el-col :span='16'>
                <el-form :model="address" status-icon :rules="rules" ref="address" label-width="108px" size='small'>
                    <el-row>
                        <el-col :span='24'>
                            <el-form-item label='收货人' prop='name'>
                                <el-input v-model="address.name" placeholder="请输入收货人" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='所在地区' prop='region'>
                                <el-input v-model="address.region" placeholder="请输入所在地区" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='详情地址' prop='detail'>
                                <el-input v-model="address.detail" placeholder="请输入详情地址" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='联系电话' prop='phone'>
                                <el-input v-model="address.phone" placeholder="请输入联系电话" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='设为默认地址' prop='isDefault'>
                                <el-radio-group v-model="address.isDefault">
                                    <el-radio label="1">是</el-radio>
                                    <el-radio label="0">否</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <div class="dm_userCenter__content--common__btn">
                        <el-button style='width: 20%' size="small" @click="resetForm('address')">清 空</el-button>
                        <el-button type="primary" style='width: 20%' size="small" @click="submitForm('address')">保 存</el-button>
                    </div>
                </el-form>
            </el-col>
            <el-col :span='8'>
                <el-form disabled label-width="110px" size='small'>
                    <el-row>
                        <el-col :span='24'>
                            <el-form-item label='收货人：' prop='name'>
                                <el-input :value="address.name || '-'" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='所在地区：' prop='region'>
                                <el-input :value="address.region || '-'" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='详情地址：' prop='detail'>
                                <el-input :value="address.detail || '-'" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='联系电话：' prop='phone'>
                                <el-input :value="address.phone || '-'" ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span='24'>
                            <el-form-item label='设为默认地址：' prop='isDefault'>
                                <el-input :value="address.isDefault | isDefaultFilters" ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-col>
        </el-row>
        <el-table
            :data="tableData"
            max-height="386"
            border
            style="width: 100%"
            row-key='id'
            size='small'
        >
            <el-table-column
                label="序号"
                type="index"
                width="72"
                align='center'
            >
            </el-table-column>
            <el-table-column v-for='c in columns' :key='c.id'
                :prop="c.prop"
                :label="c.label"
                :width="c.width"
                align='center'
                :formatter='handle0And1'
            ></el-table-column>
            <el-table-column
                prop="operation"
                label="操作"
                width="165"
                align='center'
            >
                <template slot-scope="scope">             
                    <div class='operation'>
                        <span @click="deleteAddressClick(scope.row.id)">删除</span>
                        <span @click="updateAddressClick(scope.row)">修改</span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            address: {
                name: null,
                region: null,
                detail: null,
                phone: null,
                isDefault: null
            },
            rules: {
                name: [                    
                    { required: true, message: '请输入收货人', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请输入所在地区', trigger: 'blur' }
                ],
                detail: [
                    { required: true, message: '请输入详情地址', trigger: 'blur' }
                ],
                phone: [
                    { required: true, message: '请输入联系电话', trigger: 'blur' },
                    { validator: this.$utils.validatePhoneForm, trigger: ['blur', 'change'] }
                ],
                isDefault: [
                    { required: true, message: '请选择设为默认地址', trigger: 'change' }
                ]
            },
            tableData: [],            
            columns: [
                { id: 1, prop: 'name', label: '收货人', width: 120 },
                { id: 2, prop: 'region', label: '所在地区', width: 120 },
                { id: 3, prop: 'detail', label: '详情地址' },
                { id: 4, prop: 'phone', label: '联系电话', width: 120 },
                { id: 5, prop: 'isDefault', label: '默认地址', width: 120 }
            ]
        }
    },
    mounted() {
        this.getAllAddressData();
    },
    methods: {
        // 修改收货地址 - 操作
        updateAddressClick(row = {}) {
            row.isDefault = row.isDefault + '';
            this.address = row;
        },
        // 删除收货地址 - 操作
        deleteAddressClick(id) {
            this.$confirm('确认删除这条收货地址?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.postDeleteAddressData({ id });
            }).catch(() => {
                return;
            })
        },
        // 处理是 / 否
        handle0And1(row={}, column={}, cellValue, index) {       
            let { isDefault } = row || {};
            if( column.property == 'isDefault' ) {
                let obj = {
                    '1'() {
                        return '是';
                    },
                    '0'() {
                        return '否';
                    }
                };
                return isDefault && obj[isDefault]();
            }
            return cellValue;
        },
        // 清空
        resetForm(refName) {
            this.$refs[refName].resetFields();
            this.getAllAddressData();
            this.address = {                
                name: null,
                region: null,
                detail: null,
                phone: null,
                isDefault: null
            };
        },
        // 收货地址 - 表单校验
        submitForm(refName) {
            let { isDefault } = this.address;
            this.$refs[refName].validate((valid) => {
                if(valid) {
                    this.postEditAddressData({
                        ...this.address,
                        isDefault: Number(isDefault)
                    });
                } else {
                    return false;
                }
            });
        },
        // 查询 - 收货地址
        async getAllAddressData() {
            const res = await this.$service.getAllAddressData({
                uname: sessionStorage.getItem('uname')
            });
            try{
                if( res.data.code === 200 ){
                    const { data=[] } = res.data || {};
                    this.tableData = data;
                    this.$refs['address'].resetFields();
                }
            }catch(err) {
                console.log(err);
            }
        },
        // 添加/修改 - 收货地址
        async postEditAddressData(params = {}) {
            const res = await this.$service.postEditAddressData({
                uname: sessionStorage.getItem('uname'),
                ...params
            });
            try{
                if( res.data.code === 200 ){
                    this.getAllAddressData();
                }
            }catch(err) {
                console.log(err);
            }
        },
        // 删除 - 收货地址
        async postDeleteAddressData(params = {}) {
            const res = await this.$service.postDeleteAddressData(params);
            try{
                if( res.data.code === 200 ){
                    this.getAllAddressData();
                }
            }catch(err) {
                console.log(err);
            }
        }
    },
    filters: {
        isDefaultFilters(val) {
            let obj = {
                '1'() {
                    return '是';
                },
                '0'() {
                    return '否';
                }
            };
            return (val && obj[val]()) || '-';
        }
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>