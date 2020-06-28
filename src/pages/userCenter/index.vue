<template>
    <div class="common_width dm_userCenter">
        <TableTitle title='用户中心'>
            <div>（
                <span :class=" componentName == 'PersonInfo' ? 'active' : '' " @click="changeComponent('PersonInfo')">个人资料</span>|
                <span :class=" componentName == 'LoginPwd' ? 'active' : '' " @click="changeComponent('LoginPwd')">修改登录密码</span>|
                <span :class=" componentName == 'Address' ? 'active' : '' " @click="changeComponent('Address')">收货地址</span>）
            </div>
        </TableTitle>
        <div class="dm_userCenter__content">
            <component :is='componentName'></component>
        </div>
    </div>
</template>

<script>
// 个人资料
import PersonInfo from './components/personInfo';
// 修改登录密码
import LoginPwd from './components/loginPwd';
// 收货地址
import Address from './components/address';

export default {
    components: {
        PersonInfo, LoginPwd, Address
    },
    data() {
        return {
            tableData: [],
            componentName: 'PersonInfo'
        }
    },
    methods: {
        // 动态切换组件
        changeComponent(_this) {
            this.componentName = _this;
        }
    }
}
</script>

<style lang="less">
    .dm_userCenter {
        height: 100%;
        background: #fff;
        margin-bottom: 30px !important;
        border: solid 1px #e6e6e6;
        padding: 10px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
        .dm_tableTitle {
            >div {
                span {
                    padding: 0 4px;
                    cursor: pointer;
                    &.active, &:hover {
                        font-weight: bold;
                        color: #000;
                    }
                }
            }
        }
        &__content {
            padding: 20px 0 30px;
            &--common {
                >.el-row {
                    .el-col-16 {
                        padding: 0 10px;
                        border-right: 1px solid #eee;
                    }
                    .el-col-8 {
                        padding: 0 10px 0 30px;
                    }
                }
                &__btn {
                    text-align: right;
                    margin: 30px 0;
                }
            }
        }
    }
</style>