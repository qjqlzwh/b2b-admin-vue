<template>
  <div class="app-container">
    <div class="filter-container">
      <router-link :to="'/dict/add'">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline">添加</el-button>
      </router-link>&nbsp;
      <el-button type="primary" size="medium" icon="el-icon-search" @click="doSearch">搜索</el-button>
      <el-input v-model="listQuery.dname" placeholder="词汇名" title="词汇名" size="medium" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="doSearch" />
      <el-input v-model="listQuery.dcode" placeholder="编码" title="编码" size="medium" clearable style="width: 200px;" class="filter-item" @keyup.enter.native="doSearch" />
      <el-select v-model="listQuery.isEnabled" placeholder="状态" title="状态" size="medium" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in statusOptions" :key="item.key" :label="item.val" :value="item.key" />
      </el-select>
    </div>

    <!--  列表  -->
    <el-table
      v-loading="listLoading"
      :data="listData"
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
      :tree-props="{children: 'childDict', hasChildren: 'childDict'}"
    >
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column fixed label="词汇名" width="150" align="left">
        <template slot-scope="scope">
          {{ scope.row.dname }}
        </template>
      </el-table-column>
      <el-table-column label="编码" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dcode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="二级编码" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.secondCode }}</span>
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
      <el-table-column label="最后修改时间" width="160" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column label="备注" min-width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.memo }}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope" >
          <router-link :to="'/dict/detail/'+scope.row.id" class="link-type" v-if="!scope.row.parentId">
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
import { getList, getChild } from '@/api/base/dict'

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
