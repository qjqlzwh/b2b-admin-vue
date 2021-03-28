<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" size="medium" icon="el-icon-search" @click="doSearch">搜索</el-button>
      <el-tooltip content="接口名称" placement="bottom" effect="light">
        <el-input v-model="listQuery.dname" placeholder="接口名称" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="接口类型" placement="bottom" effect="light">
        <el-input v-model="listQuery.type" placeholder="接口类型" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="响应结果" placement="right" effect="light">
        <el-select v-model="listQuery.isEnabled" placeholder="响应结果" size="medium" clearable style="width: 90px" class="filter-item">
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
      <el-table-column fixed label="单号" width="150" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.sn }}
        </template>
      </el-table-column>
      <el-table-column label="接口名称" width="150" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.dname }}
        </template>
      </el-table-column>
      <el-table-column label="接口类型" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.type }}
        </template>
      </el-table-column>
      <el-table-column label="请求报文" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.reqMsg }}
        </template>
      </el-table-column>
      <el-table-column label="接口地址" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.url }}
        </template>
      </el-table-column>
      <el-table-column label="报文来源" min-width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.docType }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="160" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="响应时间" width="160" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="响应结果" width="110" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.respResult }}
        </template>
      </el-table-column>
      <el-table-column label="响应报文" min-width="160" align="center" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.respMsg }}
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="160" align="center" show-overflow-tooltip>
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
import { getList } from '@/api/interface/task-info-log'

export default {
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
