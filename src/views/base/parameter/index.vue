<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" size="medium" icon="el-icon-search" @click="doSearch">搜索</el-button>
      <el-tooltip content="参数名称" placement="bottom" effect="light">
        <el-input v-model="listQuery.dname" placeholder="参数名称" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="参数编码" placement="bottom" effect="light">
        <el-input v-model="listQuery.dcode" placeholder="参数编码" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="状态" placement="right" effect="light">
        <el-select v-model="listQuery.isEnabled" placeholder="状态" size="medium" clearable style="width: 90px" class="filter-item">
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.val" :value="item.key" />
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
      <el-table-column fixed label="参数名称" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.dname }}
        </template>
      </el-table-column>
      <el-table-column fixed label="参数编码" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.dcode }}
        </template>
      </el-table-column>
      <el-table-column fixed label="参数值" min-width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.dvalue }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.isEnabled | statusFilter">
            {{ scope.row.isEnabled ? '启用' : '禁用' }}
          </el-tag>
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
import { getList } from '@/api/base/parameter'

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
        pageSizes: [50, 100, 300, 500, 1000]
      },
      listQuery: {
        page: 1,
        limit: 50
      },
      statusOptions: [
        { key: 'true', val: '启用' },
        { key: 'false', val: '禁用' }
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
