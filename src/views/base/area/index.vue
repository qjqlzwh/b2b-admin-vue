<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button type="primary" size="medium" icon="el-icon-search" @click="doSearch">搜索</el-button>
      <el-tooltip content="地区" placement="bottom" effect="light">
        <el-input v-model="listQuery.dname" placeholder="地区" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="地区全称" placement="bottom" effect="light">
        <el-input v-model="listQuery.fullName" placeholder="地区全称" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
    </div>

    <!--  列表  -->
    <el-table
      v-loading="listLoading"
      :data="list"
      :height="winHeight"
      element-loading-text="Loading"
      style="width: 100%"
      size="mini"
      row-key="id"
      border
      stripe
      fit
      lazy
      highlight-current-row
      :load="loadChild"
      :tree-props="{children: 'childDict', hasChildren: 'hasChild'}"
    >
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column fixed label="地区" width="250" align="left">
        <template slot-scope="scope">
          {{ scope.row.dname }}
        </template>
      </el-table-column>
      <el-table-column fixed label="简称" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.simpleName }}
        </template>
      </el-table-column>
      <el-table-column fixed label="地区全称" min-width="150" align="left">
        <template slot-scope="scope">
          {{ scope.row.fullName }}
        </template>
      </el-table-column>
      <el-table-column label="编码" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dcode }}</span>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-show="total>0"
      background
      :current-page.sync="listQuery.page"
      :page-sizes="[50, 100, 300, 500, 1000]"
      :page-size.sync="listQuery.limit"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="fetchData"
      @size-change="doSearch"
    />
  </div>
</template>

<script>
import { getList, getChild } from '@/api/base/area'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      winHeight: window.innerHeight - 170,
      total: 0,
      listQuery: {
        page: 1,
        limit: 50
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
        this.list = response.data.records
        this.total = response.data.total
        this.listLoading = false
      })
    },
    // 加载子项
    loadChild(tree, treeNode, resolve) {
      setTimeout(() => {
        getChild(tree.id).then(response => {
          resolve(response.data)
        })
      }, 100)
    }
  }
}
</script>
