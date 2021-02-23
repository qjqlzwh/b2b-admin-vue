<template>
  <div class="me-form-container">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>{{ $route.name }}</span>
        <div class="me-right">
          <el-button type="primary" icon="el-icon-check" size="mini" @click="saveOrUpdate('pobj')">保存</el-button>
          <el-button type="info" icon="el-icon-refresh" size="mini" @click="resetForm()">重置</el-button>
        </div>
      </div>
      <el-form :model="pobj" :rules="rules" :inline="true" ref="pobj" label-width="100px" size="small">
        <el-form-item label="单号">
          <el-input v-model="pobj.sn" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="pobj.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="单据状态" prop="state">
          <el-select v-model="pobj.state" clearable disabled>
            <el-option label="已保存" :value="0"></el-option>
            <el-option label="审核中" :value="1"></el-option>
            <el-option label="已审核" :value="2"></el-option>
            <el-option label="已取消" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称" prop="dname">
          <el-input v-model="pobj.dname" clearable></el-input>
        </el-form-item>
        <el-form-item label="机构" prop="organization">
          <el-input v-model="pobj.orgName" @click.native="changeOrgDialogVisible(true)" class="me-input-prefix" prefix-icon="el-icon-search" readonly></el-input>
        </el-form-item>
        <el-form-item label="生效时间" prop="validTime">
          <el-date-picker v-model="pobj.validTime" type="datetimerange" @change="changeValidTime" value-format="yyyy-MM-dd HH:mm:ss" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" align="right"></el-date-picker>
        </el-form-item>
        <br/>
        <el-form-item class="me-form-memo" label="备注" prop="memo">
          <el-input type="textarea" v-model="pobj.memo" :autosize="{ minRows: 3, maxRows: 4}" maxlength="100" show-word-limit></el-input>
        </el-form-item>

        <div class="me-inner-title">
          <p>
            <span>添加客户</span>
            <el-button type="primary" round size="mini" icon="el-icon-plus" @click.native="changeCustomerDialogVisible(true)">添加</el-button>
          </p>
        </div>
        <el-table :data="pobj.customerItem" border size="mini" style="width: 100%">
          <el-table-column fixed type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="dname" label="客户名称" width="250">
            <template slot-scope="scope">
              {{ scope.row.customerName }}
            </template>
          </el-table-column>
          <el-table-column prop="secondCode" label="客户编码" width="200">
            <template slot-scope="scope">
              {{ scope.row.customerCode }}
            </template>
          </el-table-column>
          <el-table-column prop="isEnabled" label="行状态" width="120">
            <template slot-scope="scope">
            </template>
          </el-table-column>
          <el-table-column prop="memo" label="失效时间" width="160">
            <template slot-scope="scope">
              {{ scope.row.invalidTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" >
            <template slot-scope="scope">
              <el-button type="danger" plain icon="el-icon-delete" size="mini" round @click.native.prevent="deleteRow(scope.$index, pobj.customerItem)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="me-inner-title">
          <p>
            <span>添加产品</span>
            <el-button type="primary" round size="mini" icon="el-icon-plus" @click.native.prevent="addRow(pobj.productItem)">添加</el-button>
          </p>
        </div>
        <el-table :data="pobj.productItem" border size="mini" style="width: 100%">
          <el-table-column fixed type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="dname" label="产品名称" width="200">
            <template slot-scope="scope">
              {{ scope.row.productName }}
            </template>
          </el-table-column>
          <el-table-column prop="secondCode" label="产品编码" width="200">
            <template slot-scope="scope">
              {{ scope.row.productCode }}
            </template>
          </el-table-column>
          <el-table-column prop="secondCode" label="价格" width="155">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.price" :min="0.01" label="价格"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="secondCode" label="数量" width="155">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.quantity" :min="1" label="数量"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="isEnabled" label="行状态" width="100">
            <template slot-scope="scope">
<!--              {{ statusOptions.get(scope.row.state) }}-->
            </template>
          </el-table-column>
          <el-table-column prop="memo" label="失效时间" width="150">
            <template slot-scope="scope">
              {{ scope.row.invalidTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" plain size="mini" round @click.native.prevent="deleteRow(scope.$index, pobj.productItem)">失效</el-button>
              <el-button type="danger" size="mini" round @click.native.prevent="deleteRow(scope.$index, pobj.productItem)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>

    <OrgPop v-if="orgDialogVisible" :orgDialogVisible="orgDialogVisible" :changeOrgDialogVisible="changeOrgDialogVisible" :orgPopCallback="orgPopCallback"></OrgPop>

    <CustomerPop v-if="customerDialogVisible" :customerDialogVisible="customerDialogVisible" :changeCustomerDialogVisible="changeCustomerDialogVisible" :customerPopCallback="customerPopCallback"></CustomerPop>

    <CustomerAddressPop v-if="customerAddrDialogVisible" :customerAddrDialogVisible="customerAddrDialogVisible" :changeCustomerAddrDialogVisible="changeCustomerAddrDialogVisible" :customerAddrPopCallback="customerAddrPopCallback" :customerId="pobj.customer"></CustomerAddressPop>
  </div>
</template>

<script>

import { save, update } from '@/api/product/product-price'

import OrgPop from '@/views/base/organization/org-pop'
import CustomerPop from '@/views/user/customer/customer-pop'
import CustomerAddressPop from '@/views/user/customer/customer-address-pop'

export default {
  components: {
    OrgPop,
    CustomerPop,
    CustomerAddressPop
  },
  data() {
    return {
      orgDialogVisible: false,
      customerDialogVisible: false,
      customerAddrDialogVisible: false,
      statusOptions: [
        { key: '0', val: '已保存' },
        { key: '1', val: '审核中' },
        { key: '2', val: '已审核' },
        { key: '3', val: '已取消' }
      ],
      pobj: {
        id: '',
        sn: '',
        createTime: '',
        startTime: '',
        endTime: '',
        validTime: '',
        organization: '',
        orgName: '',
        state: '',
        memo: '',
        customerItem: [],
        productItem: []
      },
      rules: {
        dname: [
          { required: true, message: '价目表名称不能为空', trigger: 'blur' }
        ],
        organization: [
          { required: true, message: '机构不能为空', trigger: 'blur' }
        ],
        validTime: [
          { required: true, message: '生效时间不能为空' }
        ]
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.getDict(this.$route.params.id)
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
    // 改变客户弹框可见
    changeCustomerDialogVisible(boo) {
      this.customerDialogVisible = boo
    },
    // 选择客户回调
    customerPopCallback(data) {
      for (let item of data) {
        this.pobj.customerItem.push({
          customer: item.id,
          customerName: item.dname,
          customerCode: item.dcode
        })
      }
    },
    // 改变客户地址弹框可见
    changeCustomerAddrDialogVisible(boo) {
      if (!this.pobj.customer) {
        this.$message.warning('请先选择客户')
        return false
      }
      this.customerAddrDialogVisible = boo
    },
    // 选择客户地址回调
    customerAddrPopCallback(data) {
      const addr = data[0]
      this.pobj.customerAddress = addr.id
      this.pobj.shConsignee = addr.consignee
      this.pobj.shPhone = addr.phone
      this.pobj.shProvince = addr.province
      this.pobj.shCity = addr.city
      this.pobj.shDistrict = addr.district
      this.pobj.shDetailedAddress = addr.detailedAddress
    },
    // 改变生效时间
    changeValidTime() {
      if (this.pobj.validTime) {
        [this.pobj.startTime, this.pobj.endTime] = this.pobj.validTime
      } else {
        this.pobj.startTime = ''
        this.pobj.endTime = ''
      }
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
              // 更新
              this.toUpdate()
            } else {
              // 保存
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
          // 添加成功
          this.$message.success('添加成功')
          // 回到列表
          this.$router.push({ path: '/dict/list' })
        })
    },
    toUpdate() {
      update(this.pobj)
        .then(response => {
          // 更新成功
          this.$message.success('更新成功')
          // 回到列表
          this.$router.push({ path: '/dict/list' })
        })
    },
    // 重置
    resetForm() {
      // this.$refs[formObj].resetFields()
      // location.reload()
      Object.assign(this.$data, this.$options.data())
    },
    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    addRow(rows) {
      rows.push({
        isEnabled: 'true'
      })
    }
  }
}
</script>
