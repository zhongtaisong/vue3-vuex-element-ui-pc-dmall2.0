<template>
    <div class='common_width dm_searchResults'>
        <TableTitle title='搜索结果'>
            <div>（共搜索到 <i>{{ searchResult.length }}</i> 条数据）</div>
        </TableTitle>
        <el-table
            :data="searchResult"
            style="width: 100%"
            row-key='id'
            size='small'
        >
            <el-table-column v-for='c in columns' :key='c.id'
                :prop="c.prop"
                :label="c.label"
                :width="c.width"
                header-align='left'
            >
                <template slot-scope="scope">
                    <img v-if="c.prop == 'mainPicture'" :style='{ width: "100%", cursor: "pointer" }' :src="$url + scope.row.mainPicture" />
                    <span v-if="c.prop == 'productName'">{{ scope.row.productName }}</span>
                    <router-link v-if="c.prop == 'description'" class='title_style' :to="{ name: 'productsDetails', params: { id: scope.row.id } }">
                        <span :title='scope.row.description'>{{ scope.row.description }}</span>
                        <span class='ellipsis'>规格：{{ scope.row.spec }}</span>
                    </router-link>
                    <span v-if="c.prop == 'price'">￥{{ scope.row['price'] | keepTwoDecimalPlaces }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            columns: [
                { id: 1, prop: 'mainPicture', label: '', width: 86 },
                { id: 2, prop: 'productName', label: '品牌规格', width: 136 },
                { id: 3, prop: 'description', label: '描述' },
                { id: 4, prop: 'price', label: '单价', width: 136 }
            ]
        }
    },
    computed: {
        ...mapState({
            searchResult: state => state.searchResult
        })
    }
};
</script>

<style lang="less">
    @import './index.less';
</style>