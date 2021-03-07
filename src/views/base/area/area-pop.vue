<template>
  <!--  弹框  -->
  <el-dialog title="选择地区" class="me-pop-table" top="6vh" center @close="closePopArea" :visible.sync="areaDialogVisible">
    <div class="filter-container">
      <el-button type="success" size="mini" icon="el-icon-thumb" @click="confirm">确认</el-button>
      <el-button type="primary" size="mini" icon="el-icon-search" @click="doAreaPopSearch">搜索</el-button>
      <el-tooltip content="地区名称" placement="bottom" effect="light">
        <el-input v-model="listQuery.dname" placeholder="地区名称" size="mini" clearable class="filter-item" @keyup.enter.native="doSearch" />
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
      :load="loadChild"
      :tree-props="{children: 'childDict', hasChildren: 'hasChild'}"
    >
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column fixed label="地区名称" width="150" align="left">
        <template slot-scope="scope">
          {{ scope.row.dname }}
        </template>
      </el-table-column>
      <el-table-column fixed label="地区全称" align="center">
        <template slot-scope="scope">
          {{ scope.row.fullName }}
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
      @current-change="fetchAreaPopData"
      @size-change="doAreaPopSearch"
    />
  </el-dialog>
</template>

<script>

import { getList, getChild } from '@/api/base/area'

export default {
  // 声明接收的父属性
  props: {
    isSingle: Boolean, // 是否单选
    areaDialogVisible: Boolean,
    changeAreaDialogVisible: Function,
    areaPopCallback: Function
  },

  data() {
    return {
      listData: [],
      listLoading: true,
      winHeight: window.innerHeight - 220,
      page: {
        pagerCount: 5,
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
    this.doAreaPopSearch()
  },
  methods: {
    // 确认，将选中的行数据带回去父组件
    confirm() {
      const rows = this.$refs.tb.selection
      if (rows.length > 0) {
        this.areaPopCallback(rows)
        this.closePopArea()
      } else {
        this.$message.info('请先选中一行再确认！')
      }
    },
    // 行选中
    rowSelected(val) {
      this.$refs.tb.toggleRowSelection(val)
    },
    handleSelectionChange(val) {
      if (this.isSingle) {
        if (val.length > 1) {
          this.$refs.tb.clearSelection()
          this.$refs.tb.toggleRowSelection(val.pop())
        } else {
          this.chek = val
        }
      }
    },
    onSelectAll() {
      this.$refs.tb.clearSelection()
    },
    closePopArea() {
      this.changeAreaDialogVisible(false)
    },
    doAreaPopSearch() { // 搜索
      this.listQuery.page = 1
      this.fetchAreaPopData()
    },
    fetchAreaPopData() { // 查数据
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.listData = response.data.records
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

<style scoped>

</style>
