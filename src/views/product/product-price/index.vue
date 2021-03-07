<template>
  <div class="app-container">
    <div class="filter-container">
      <router-link :to="'/product-price/add'">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline">添加</el-button>
      </router-link>&nbsp;
      <el-button type="primary" size="medium" icon="el-icon-search" @click="doSearch">搜索</el-button>
      <el-tooltip content="单号" placement="bottom" effect="light">
        <el-input v-model="listQuery.sn" placeholder="单号" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="价目表名称" placement="bottom" effect="light">
        <el-input v-model="listQuery.dname" placeholder="价目表名称" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="状态" placement="right" effect="light">
        <el-select v-model="listQuery.state" placeholder="状态" size="medium" clearable style="width: 105px" class="filter-item">
          <el-option v-for="(value, key) in statusOptions" :key="key" :label="value" :value="key" />
        </el-select>
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
      <el-table-column fixed label="单号" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.sn }}
        </template>
      </el-table-column>
      <el-table-column label="价目表名称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.dname }}
        </template>
      </el-table-column>
      <el-table-column label="机构" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.orgName }}
        </template>
      </el-table-column>
      <el-table-column label="状态" min-width="100" align="center">
        <template slot-scope="scope">
          {{ statusOptions[scope.row.state] }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间" min-width="150" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.startTime }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" min-width="150" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.endTime }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" min-width="150" align="center">
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
          <router-link :to="'/product-price/detail/'+scope.row.id" class="link-type">
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
import { getList } from '@/api/product/product-price'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[status]
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
        '1': '审核中',
        '2': '已审核',
        '3': '已取消'
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
