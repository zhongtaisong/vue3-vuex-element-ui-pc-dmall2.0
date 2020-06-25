<template>
    <div class="common_width dm_myComment">
        <TableTitle title='我的评价'>
            <div>（ 评价中。。。 ）</div>
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
        <div class="dm_myComment__textarea">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                <el-form-item label='写评价：' prop='content'>
                    <el-input
                        type="textarea"
                        placeholder="请输入内容"
                        maxlength="300"
                        minlength='1'
                        show-word-limit
                        :autosize="{ minRows: 4, maxRows: 4}"
                        v-model="ruleForm.content"
                    >
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="dm_myComment__btn">            
            <el-button type="primary" @click="submitForm('ruleForm')">发表评价</el-button>
        </div>
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
            ruleForm: {
                content: ''
            },
            rules: {
                content: [
                    { required: true, message: '请输入内容', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        try {
            const { id, oIndex } = this.$route.query || {};
            this.getAllOrderData({ id, oIndex });
        } catch (error) {
            console.log(error);
        }
    },
    methods: {
        // 发表评价 - 表单校验
        submitForm(refName) {
            this.$refs[refName].validate((valid) => {
                if(valid) {
                    let tableData = this.tableData;
                    let pidArr = tableData.map(item => item.id) || [];
                    this.postAddCommentData({ 
                        ...this.ruleForm,
                        pid: pidArr[0]
                    })
                } else {
                    return false;
                }
            });
        },
        // 发表评价
        async postAddCommentData(params = {}) {
            const res = await this.$service.postAddCommentData({
                uname: sessionStorage.getItem('uname'),
                ...params
            });
            try {
                if (res.data.code === 200) {
                    this.$router.go(-1);
                }
            } catch (err) {
                console.log(err);
            }
        },
        // 查询待评价商品
        async getAllOrderData(params = {}) {
            const res = await this.$service.getAllOrderData({
                uname: sessionStorage.getItem('uname'),
                ...params
            });
            try {
                if (res.data.code === 200) {
                    const { data=[] } = res.data || {};
                    this.tableData = data;
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