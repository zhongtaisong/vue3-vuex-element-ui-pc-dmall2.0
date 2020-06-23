<template>
    <div class="dm_products">
        <div class='common_width'>
            <div class='filter_title'>
                <h1>商品筛选</h1>
                <span>共 {{ total || 0 }} 件商品</span>
            </div>
            <div class='filter_current'>                
                <div v-if='Object.keys(filterObj).length'>
                    <el-tag size='small' closable v-for='(value, key, index) in filterObj' :key='index' @close='deleteTag(key)'>{{ key == 'brandId' ? BRAND_LIST[value] : value }}</el-tag>
                    <p @click="clearFilter">清空筛选</p>
                </div>
                <div v-else>
                    <el-tag size='small'>暂无筛选条件</el-tag>
                </div>
            </div>
            <div class='filter_condition'>
                <div v-for='(f, index) in filterList' :key='index'>
                    <el-row>
                        <el-col :span='2'>品牌：</el-col>
                        <el-col :span='22'>
                            <span v-for='(item, index) in f.brandId' :key='index'
                                @click="currentFilter('brandId', item)"
                            >{{ BRAND_LIST ? BRAND_LIST[item] : item }}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='2'>价格：</el-col>
                        <el-col :span='22'>
                            <span v-for='(item, index) in ["0-3999", "4000-4499", "4500-4999", "5000-5499", "5500-5999", "6000-6999", "7000以上"]' :key='index' 
                                @click="currentFilter('price', item)"
                            >{{ item }}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='2'>屏幕尺寸：</el-col>
                        <el-col :span='22'>
                            <span v-for='(item, index) in f.screenSize' :key='index'
                                @click="currentFilter('screenSize', item)"
                            >{{ item }}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='2'>处理器：</el-col>
                        <el-col :span='22'>
                            <span v-for='(item, index) in f.cpu' :key='index'
                                @click="currentFilter('cpu', item)"
                            >{{ item }}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='2'>内存容量：</el-col>
                        <el-col :span='22'>
                            <span v-for='(item, index) in f.memory' :key='index'
                                @click="currentFilter('memory', item)"
                            >{{ item }}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='2'>硬盘容量：</el-col>
                        <el-col :span='22'>
                            <span v-for='(item, index) in f.disk' :key='index'
                                @click="currentFilter('disk', item)"
                            >{{ item }}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='2'>系统：</el-col>
                        <el-col :span='22'>
                            <span v-for='(item, index) in f.systems' :key='index'
                                @click="currentFilter('systems', item)"
                            >{{ item }}</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span='2'>厚度：</el-col>
                        <el-col :span='22'>
                            <span v-for='(item, index) in f.thickness' :key='index'
                                @click="currentFilter('thickness', item)"
                            >{{ item }}</span>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class='all_products'>
                <Card :list='productList' :num='5' width='calc(20% - 10px)' :len='56'>
                    <template v-slot='slotProps'>                  
                        <div class="dm_card__btn">
                            <el-input-number controls-position="right" :min='1' :max='99' size='small' v-model="slotProps.num" @change='numberChange($event, slotProps)'></el-input-number>
                            <el-button type="primary" plain size='small' @click="addCartClick(slotProps)">加入购物车</el-button>
                        </div>
                    </template>
                </Card>
            </div>
            <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                hide-on-single-page
                @current-change='pageChange'
            />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            current: 1,
            pageSize: 10,
            productList: [],
            filterList: [],
            total: 0,
            filterObj: {},
            visible: {}
        }
    },
    mounted() {
        this.getProductsData();
        this.getFilterData();
    },
    methods: {
        // 数量 - 操作
        numberChange(value, props={}) {
            const { id } = props;
            this.productList.map(item => {
                if(item.id == id) {
                    item.num = value;
                }
            })
        },
        // 加入购物车
        addCartClick(props={}) {
            const { id, price, num } = props;
            this.$store.dispatch('handleAddCart', { list: [{
                pid: id,
                num,
                totalprice: price ? Number(price) * num : price
            }] })
        },
        // 清空筛选
        clearFilter() {
            this.filterObj = {};
            this.getProductsData();
        },
        // 删除tag
        deleteTag(item) {
            delete this.filterObj[item];
            this.visible[item] = false;
            this.getProductsData();
        },
        // 分页变化
        pageChange(page) {
            this.current = page;
            this.getProductsData();
        },
        // 被选中当前筛选条件
        currentFilter(key, value) {
            let visible = {},
                filterObj = {};
            filterObj[key] = value;
            Object.keys(filterObj).map((item, index) => {
                visible[item] = true;
            });

            this.filterObj = {...this.filterObj, ...filterObj};
            this.visible = {...this.visible, visible};
            this.current = 1;
            this.getProductsData();
        },
        // 获取全部商品
        async getProductsData(params={}) {
            const res = await this.$service.getProductsData({
                current: this.current,
                pageSize: this.pageSize,
                onLine: 100,
                filterList: this.filterObj
            });
            try {
                if (res.data.code === 200) {
                    const { products=[], total } = res.data.data || {};
                    products.map(item => {
                        item["mainPicture"] = item["mainPicture"] ? this.$url + item["mainPicture"] : "";
                        item["num"] = 1;
                    });
                    this.productList = products;
                    this.total = total;
                }
            } catch (err) {
                console.log(err);
            }
        },
        // 获取商品筛选条件
        async getFilterData(params={}) {
            const res = await this.$service.getFilterData(params);
            try {
                if (res.data.code === 200) {
                    const { data = [] } = res.data || {};
                    this.filterList = data;
                }
            } catch (err) {
                console.log(err);
            }
        }
    },
    computed: {
        BRAND_LIST() {
            return this.$tableDic.BRAND_LIST;
        }
    }
}
</script>

<style lang="less">
    @import './index.less';
</style>