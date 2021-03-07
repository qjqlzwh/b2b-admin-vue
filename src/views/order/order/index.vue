<template>
  <div class="app-container">
    <div class="filter-container">
      <router-link :to="'/order/add'">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline">添加</el-button>
      </router-link>&nbsp;
      <el-button type="primary" size="medium" icon="el-icon-search" @click="doSearch">搜索</el-button>
      <el-tooltip content="订单号" placement="bottom" effect="light">
        <el-input v-model="listQuery.sn" placeholder="订单号" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="客户名称" placement="bottom" effect="light">
        <el-input v-model="listQuery.customerName" placeholder="客户名称" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="状态" placement="top" effect="light">
        <el-select v-model="listQuery.state" multiple collapse-tags placeholder="状态" size="medium" clearable style="width: 150px" class="filter-item">
          <el-option v-for="(value, key) in statusOptions" :key="key" :label="value" :value="key" />
        </el-select>
      </el-tooltip>
      <el-tooltip content="业务员" placement="bottom" effect="light">
        <el-input v-model="listQuery.salesmanName" placeholder="业务员" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
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
      <el-table-column fixed label="订单号" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.sn }}
        </template>
      </el-table-column>
      <el-table-column label="客户名称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.customer_name }}
        </template>
      </el-table-column>
      <el-table-column label="客户编码" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.customer_code }}
        </template>
      </el-table-column>
      <el-table-column label="订单金额" min-width="150" align="center">
        <template slot-scope="scope">
          <span style="color: red">
            <i class="el-icon-money"></i>
            {{ scope.row.total_price }}
          </span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.state | statusFilter">
            {{ statusOptions[scope.row.state] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="订单类型" width="110" align="center">
        <template slot-scope="scope">
          {{ orderTypeOptions[scope.row.order_type] }}
        </template>
      </el-table-column>
      <el-table-column label="业务员" min-width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.salesman_name }}
        </template>
      </el-table-column>
      <el-table-column label="机构" min-width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.org_name }}
        </template>
      </el-table-column>
      <el-table-column label="收货人" min-width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.sh_consignee }}
        </template>
      </el-table-column>
      <el-table-column label="收货人电话" min-width="130" align="center">
        <template slot-scope="scope">
          {{ scope.row.sh_phone }}
        </template>
      </el-table-column>
      <el-table-column label="收货省市区" min-width="150" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.sh_province + scope.row.sh_city + scope.row.sh_district }}
        </template>
      </el-table-column>
      <el-table-column label="收货地址" min-width="150" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.sh_detailed_address }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="160" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="150" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.memo }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <router-link :to="'/order/detail/'+scope.row.id" class="link-type">
            <el-button class="filter-item" style="padding: 5px 9px;" type="primary" plain size="mini" round icon="el-icon-edit-outline">编辑</el-button>
          </router-link>
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

import { getList } from '@/api/order/order'

export default {
  filters: {
    statusFilter(state) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[state]
    }
  },
  data() {
    return {
      listData: [],
      listLoading: true,
      winHeight: window.innerHeight - 170,
      page: {
        total: 0,
        pageSizes: this.$page.pageSizes
      },
      listQuery: {
        page: 1,
        limit: this.$page.limit
      },
      statusOptions: {
        '0': '已保存',
        '1': '已提交',
        '2': '已审核',
        '3': '已取消'
      },
      orderTypeOptions: {
        '0': '普通订单',
        '1': '现金订单'
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
