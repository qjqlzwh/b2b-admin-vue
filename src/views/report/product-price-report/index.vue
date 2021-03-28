<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" size="medium" icon="el-icon-search" @click="doSearch">搜索</el-button>
      <el-tooltip content="价格表单号" placement="bottom" effect="light">
        <el-input v-model="listQuery.sn" placeholder="价格表单号" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="客户名称" placement="bottom" effect="light">
        <el-input v-model="listQuery.customerName" placeholder="客户名称" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="客户编码" placement="bottom" effect="light">
        <el-input v-model="listQuery.customerCode" placeholder="客户编码" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="产品名称" placement="bottom" effect="light">
        <el-input v-model="listQuery.productName" placeholder="产品名称" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="产品编码" placement="bottom" effect="light">
        <el-input v-model="listQuery.productCode" placeholder="产品编码" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
    </div>

    <!--  列表  -->
    <el-table
      v-loading="listLoading"
      :data="listData"
      :height="winHeight"
      element-loading-text="Loading"
      size="mini"
      row-key="id"
      border
      stripe
      fit
      highlight-current-row
    >
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column fixed label="价格表单号" width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.sn }}
        </template>
      </el-table-column>
      <el-table-column label="价格表名称" width="150" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.dname }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="160" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.start_time }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="160" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.end_time }}
        </template>
      </el-table-column>
      <el-table-column label="客户名称" width="150" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.customer_name }}
        </template>
      </el-table-column>
      <el-table-column label="客户编码" width="160" align="center">
        <template slot-scope="scope">
          {{ scope.row.customer_code }}
        </template>
      </el-table-column>
      <el-table-column label="产品名称" min-width="250" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.product_name }}
        </template>
      </el-table-column>
      <el-table-column label="产品编码" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.product_code }}
        </template>
      </el-table-column>
      <el-table-column label="产品型号" min-width="150" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.product_model }}
        </template>
      </el-table-column>
      <el-table-column label="价格" min-width="130" align="center">
        <template slot-scope="scope">
          <span style="color: red">
            <i class="el-icon-money"></i>
            {{ scope.row.price }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="数量" min-width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.quantity }}
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
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="fetchData"
      @size-change="doSearch"
    />
  </div>
</template>

<script>
import { getList } from '@/api/report/product-price-report'

export default {
  data() {
    return {
      listData: [],
      listLoading: true,
      winHeight: this.$page.winHeight,
      page: {
        total: 0,
        pageSizes: this.$page.pageSizes
      },
      listQuery: {
        page: 1,
        limit: this.$page.limit
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    doSearch() { // 搜索
      this.listQuery.page = 1
      this.fetchData()
    },
    fetchData() { // 查数据
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.listData = response.data.records
        this.page.total = response.data.total
        this.listLoading = false
      })
    }
  }
}
</script>
