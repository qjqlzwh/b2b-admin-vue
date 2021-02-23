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
        <el-select v-model="listQuery.state" placeholder="状态" size="medium" clearable style="width: 100px" class="filter-item">
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.val" :value="item.key" />
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
          {{ scope.row.customerName }}
        </template>
      </el-table-column>
      <el-table-column label="客户编码" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.customerCode }}
        </template>
      </el-table-column>
      <el-table-column label="订单金额" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.totalPrice }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.state | statusFilter">
            {{ statusOptions.get(scope.row.state) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="订单类型" width="110" align="center">
        <template slot-scope="scope">
            {{ orderTypeOptions.get(scope.row.orderType) }}
        </template>
      </el-table-column>
      <el-table-column label="业务员" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.salesmanName }}
        </template>
      </el-table-column>
      <el-table-column label="机构" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.orgName }}
        </template>
      </el-table-column>
      <el-table-column label="收货人" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.shConsignee }}
        </template>
      </el-table-column>
      <el-table-column label="收货人电话" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.shPhone }}
        </template>
      </el-table-column>
      <el-table-column label="收货省市区" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.shProvince + scope.row.shCity + scope.row.shDistrict }}
        </template>
      </el-table-column>
      <el-table-column label="收货地址" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.shDetailedAddress }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="160" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="150" align="center">
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
        pageSizes: [50, 100, 300, 500, 1000]
      },
      listQuery: {
        page: 1,
        limit: 50
      },
      statusOptions: [
        { key: '0', val: '已保存' },
        { key: '1', val: '已提交' },
        { key: '2', val: '已审核' },
        { key: '3', val: '已取消' }
      ],
      orderTypeOptions: [
        { key: '0', val: '普通订单' },
        { key: '1', val: '现金订单' }
      ]
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
