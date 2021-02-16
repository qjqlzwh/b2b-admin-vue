<template>
  <div class="app-container">
    <div class="filter-container">
      <router-link :to="'/usercenter/add'">
        <el-button type="primary" size="medium" icon="el-icon-circle-plus-outline">添加</el-button>
      </router-link>&nbsp;
      <el-button type="primary" size="medium" icon="el-icon-search" @click="doSearch">搜索</el-button>
      <el-tooltip content="用户名" placement="bottom" effect="light">
        <el-input v-model="listQuery.username" placeholder="用户名" size="medium" clearable class="filter-item" @keyup.enter.native="doSearch" />
      </el-tooltip>
      <el-tooltip content="状态" placement="top" effect="light">
        <el-select v-model="listQuery.isEnabled" placeholder="状态" size="medium" clearable style="width: 90px" class="filter-item">
          <el-option v-for="item in statusOptions" :key="item.key" :label="item.val" :value="item.key" />
        </el-select>
      </el-tooltip>
      <el-tooltip content="用户类型" placement="right" effect="light">
        <el-select v-model="listQuery.userType" placeholder="用户类型" size="medium" clearable style="width: 110px" class="filter-item">
          <el-option v-for="item in userTypeOptions" :key="item.key" :label="item.val" :value="item.key" />
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
      stripe
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
<!--      <el-table-column align="center" label="ID" width="95">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.$index }}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column type="selection" width="45" align="center"></el-table-column>
      <el-table-column fixed label="用户名" width="160" align="center">
        <template slot-scope="scope">
          {{ scope.row.username }}
        </template>
      </el-table-column>
      <el-table-column label="电话" width="130" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.isEnabled ? 'success' : 'danger'">
            {{ scope.row.isEnabled ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="用户类型" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.userType === 1 ? '企业用户' : '内部用户' }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.createTime }}
        </template>
      </el-table-column>
      <el-table-column label="最后修改时间" width="180" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="100">
        <template slot-scope="scope">
          <router-link :to="'/usercenter/detail/'+scope.row.id" class="link-type">
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
import { getList } from '@/api/user/usercenter'

export default {
  data() {
    return {
      listData: [],
      listLoading: true,
      winHeight: window.innerHeight - 165,
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
      ],
      userTypeOptions: [
        { key: 0, val: '内部用户' },
        { key: 1, val: '企业用户' }
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
