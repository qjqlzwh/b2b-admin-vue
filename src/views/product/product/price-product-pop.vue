<template>
  <!--  弹框  -->
  <el-dialog title="选择产品" class="me-pop-table" top="6vh" width="60%" center @close="closePop" :visible.sync="priceProductDialogVisible">
    <div class="filter-container">
      <el-button type="success" size="mini" icon="el-icon-thumb" @click="confirm">确认</el-button>
      <el-button type="primary" size="mini" icon="el-icon-search" @click="doPopSearch">搜索</el-button>
      <el-tooltip content="产品名称" placement="bottom" effect="light">
        <el-input v-model="listQuery.dname" placeholder="产品名称" size="mini" clearable class="filter-item" @keyup.enter.native="doPopSearch" />
      </el-tooltip>
      <el-tooltip content="产品编码" placement="bottom" effect="light">
        <el-input v-model="listQuery.dcode" placeholder="产品编码" size="mini" clearable class="filter-item" @keyup.enter.native="doPopSearch" />
      </el-tooltip>
    </div>

    <el-table
      v-loading="listLoading"
      :data="listData"
      :max-height="winHeight"
      ref="tb"
      @selection-change="handleSelectionChange"
      @select-all="onSelectAll"
      @row-click="rowSelected"
      element-loading-text="Loading"
      style="width: 100%;"
      size="mini"
      row-key="id"
      border
      stripe
      fit
      lazy
      highlight-current-row
    >
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column fixed label="产品名称" align="center">
        <template slot-scope="scope">
          {{ scope.row.product_name }}
        </template>
      </el-table-column>
      <el-table-column label="产品编码" width="135" align="center">
        <template slot-scope="scope">
          {{ scope.row.product_code }}
        </template>
      </el-table-column>
      <el-table-column label="产品型号" width="145" align="center">
        <template slot-scope="scope">
          {{ scope.row.product_model }}
        </template>
      </el-table-column>
      <el-table-column label="价格" width="115" align="center">
        <template slot-scope="scope">
          <i class="el-icon-money"></i>
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="价格表名称" width="135" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.product_price_name }}
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-show="page.total > 0"
      background
      :current-page.sync="listQuery.page"
      :page-sizes="page.pageSizes"
      :page-size.sync="listQuery.limit"
      :total="page.total"
      :pager-count="page.pagerCount"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="fetchPopData"
      @size-change="doPopSearch"
    />
  </el-dialog>
</template>

<script>

import { getPopPriceList } from '@/api/product/product'

export default {
  // 声明接收的父属性
  props: {
    priceProductDialogVisible: Boolean,
    changePriceProductDialogVisible: Function,
    priceProductPopCallback: Function,
    customerId: Number
  },
  data() {
    return {
      listData: [],
      listLoading: true,
      winHeight: window.innerHeight - 220,
      page: {
        pagerCount: 5,
        total: 0,
        pageSizes: [50, 100, 300, 500, 1000]
      },
      listQuery: {
        page: 1,
        limit: 50
      }
    }
  },
  created() {
    this.doPopSearch()
  },
  methods: {
    // 确认，将选中的行数据带回去父组件
    confirm() {
      const rows = this.$refs.tb.selection
      if (rows.length > 0) {
        this.priceProductPopCallback(rows)
        this.closePop()
      } else {
        this.$message.info('请先选中一行再确认！')
      }
    },
    // 行选中
    rowSelected(val) {
      this.$refs.tb.toggleRowSelection(val)
    },
    handleSelectionChange(val) {
      if (val.length > 1) {
        // this.$refs.tb.clearSelection()
        // this.$refs.tb.toggleRowSelection(val.pop())
      } else {
        // this.chek = val
      }
    },
    onSelectAll() {
      this.$refs.tb.clearSelection()
    },
    closePop() {
      this.changePriceProductDialogVisible(false)
    },
    doPopSearch() { // 搜索
      this.listQuery.page = 1
      this.fetchPopData()
    },
    fetchPopData() { // 查数据
      this.listLoading = true
      this.listQuery.customer = this.customerId
      getPopPriceList(this.listQuery).then(response => {
        this.listData = response.data.records
        this.page.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
