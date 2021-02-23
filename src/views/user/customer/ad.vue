<template>
  <div class="me-form-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{ $route.name }}</span>
        <div class="me-right">
          <el-button type="primary" size="mini" @click="saveOrUpdate('pobj')">保存</el-button>
          <el-button type="info" size="mini" @click="resetForm('pobj')">重置</el-button>
        </div>
      </div>
      <el-form :model="pobj" :rules="rules" :inline="true" ref="pobj" label-width="100px" size="small">
        <el-form-item label="客户名称" prop="dname">
          <el-input v-model="pobj.dname" clearable></el-input>
        </el-form-item>
        <el-form-item label="客户编码" prop="dcode">
          <el-input v-model="pobj.dcode" clearable disabled></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="isEnabled">
          <el-radio-group v-model="pobj.isEnabled">
            <el-radio border :label="true">是</el-radio>
            <el-radio border :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="业务员" prop="salesman">
          <el-input v-model="pobj.salesmanName" @click.native="changeUserDialogVisible(true)" class="me-input-prefix" prefix-icon="el-icon-search" readonly>
            <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="pobj.salesman=''; pobj.salesmanName=''" @click.stop></i>
          </el-input>
        </el-form-item>
        <el-form-item label="机构" prop="organization">
          <el-input v-model="pobj.orgName" @click.native="changeOrgDialogVisible(true)" class="me-input-prefix" prefix-icon="el-icon-search" readonly>
            <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="pobj.organization=''; pobj.orgName=''" @click.stop></i>
          </el-input>
        </el-form-item>
        <el-form-item label="营业执照号">
          <el-input v-model="pobj.licenseNo" clearable></el-input>
        </el-form-item>

        <div class="me-inner-title">
          <p>
            <span>收货地址</span>
            <el-button type="primary" round size="mini" icon="el-icon-plus" @click.native.prevent="addRow(pobj.customerAddressList)">添加</el-button>
          </p>
        </div>

        <el-table :data="pobj.customerAddressList" border size="mini" style="width: 100%">
          <el-table-column fixed type="index" width="50" align="center"></el-table-column>
          <el-table-column class="cell" prop="consignee" label="收货人" width="140">
            <template slot-scope="scope">
              <el-input v-model="scope.row.consignee" size="small" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="secondCode" label="电话" width="170">
            <template slot-scope="scope">
              <el-input v-model="scope.row.phone" size="small" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="secondCode" label="省市区" width="250">
            <template slot-scope="scope">
              <el-cascader
                size="small"
                v-model="scope.row.area3j"
                :options="areaData"
                :props="{ value: 'dname', label: 'dname', children: 'childArea', leaf: 'id' }"
                @change="changeArea(scope.row)"
                clearable></el-cascader>
            </template>
          </el-table-column>
          <el-table-column prop="secondCode" label="详细地址" min-width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.detailedAddress" size="small" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="isEnabled" label="是否启用" width="120">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.isEnabled">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column prop="isDefault" label="是否默认" width="120">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.isDefault">
                <el-radio :label="true">是</el-radio>
                <el-radio :label="false">否</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" plain icon="el-icon-delete" size="mini" round @click.native.prevent="deleteRow(scope.$index, pobj.customerAddressList)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>

    <OrgPop v-if="orgDialogVisible" :orgDialogVisible="orgDialogVisible" :changeOrgDialogVisible="changeOrgDialogVisible" :orgPopCallback="orgPopCallback"></OrgPop>

    <UserPop v-if="userDialogVisible" :userDialogVisible="userDialogVisible" :changeUserDialogVisible="changeUserDialogVisible" :userPopCallback="userPopCallback"></UserPop>
  </div>
</template>

<script>

import { save, update, detail } from '@/api/user/customer'
import { allArea } from '@/api/base/area'

import OrgPop from '@/views/base/organization/org-pop'
import UserPop from '@/views/user/usercenter/userPop'

export default {
  components: {
    OrgPop,
    UserPop
  },
  data() {
    return {
      orgDialogVisible: false,
      userDialogVisible: false,
      areaData: [],
      pobj: {
        dname: '',
        dcode: '',
        licenseNo: '',
        organization: '',
        orgName: '',
        salesman: '',
        salesmanName: '',
        isEnabled: true,
        customerAddressList: []
      },
      rules: {
        dname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 50, message: '长度不能少于 2 个字符', trigger: 'blur' }
        ],
        organization: [
          { required: true, message: '机构不能为空' }
        ],
        salesman: [
          { required: true, message: '业务员不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getAllArea()
    if (this.$route.params && this.$route.params.id) {
      this.getDetail(this.$route.params.id)
    }
  },
  methods: {
    // 改变机构弹框可见
    changeOrgDialogVisible(boo) {
      this.orgDialogVisible = boo
    },
    // 选择上级机构回调
    orgPopCallback(data) {
      this.pobj.organization = data[0].id
      this.pobj.orgName = data[0].dname
    },
    // 改变业务员弹框可见
    changeUserDialogVisible(boo) {
      this.userDialogVisible = boo
    },
    // 选择业务员回调
    userPopCallback(data) {
      this.pobj.salesman = data[0].id
      this.pobj.salesmanName = data[0].username
    },
    // 获取所有地区
    getAllArea() {
      allArea().then(response => {
        this.areaData = response.data
      })
    },
    changeArea(row) {
      [row.province, row.city, row.district] = row.area3j
    },
    // 保存或更新
    saveOrUpdate(formObj) {
      this.$refs[formObj].validate((valid) => {
        if (valid) {
          this.$confirm('是否确定保存?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            // 根据id是否存在来处理更新、保存
            if (this.pobj.id) {
              this.toUpdate()
            } else {
              this.toSave()
            }
          })
        } else {
          return false
        }
      })
    },
    // 保存
    toSave() {
      save(this.pobj)
        .then(response => {
          this.$message.success('添加成功')
          this.$router.push({ path: '/customer/list' })
        })
    },
    toUpdate() {
      update(this.pobj)
        .then(response => {
          this.$message.success('更新成功')
          this.$router.push({ path: '/customer/list' })
        })
    },
    getDetail(id) {
      detail(id)
        .then(response => {
          this.pobj = response.data
          for (let addr of this.pobj.customerAddressList) {
            addr.area3j = [addr.province, addr.city, addr.district]
          }
        })
    },
    // 重置
    resetForm(formObj) {
      this.$refs[formObj].resetFields()
    },
    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    addRow(rows) {
      rows.push({
        isEnabled: true,
        isDefault: false
      })
    }
  }
}
</script>
