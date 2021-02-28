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
        <el-form-item label="订单号">
          <el-input v-model="pobj.sn" disabled></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="pobj.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="订单状态" prop="state">
          <el-select v-model="pobj.state" clearable disabled>
            <el-option label="已保存" :value="0"></el-option>
            <el-option label="已提交" :value="1"></el-option>
            <el-option label="已审核" :value="2"></el-option>
            <el-option label="已取消" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户" prop="customer">
          <el-input v-model="pobj.customerName" @click.native="changeCustomerDialogVisible(true)" class="me-input-prefix" prefix-icon="el-icon-search" readonly>
<!--            <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="pobj.customer=''; pobj.customerName=''" @click.stop></i>-->
          </el-input>
        </el-form-item>
        <el-form-item label="机构">
          <el-input v-model="pobj.organizationName" disabled></el-input>
        </el-form-item>
        <el-form-item label="业务员">
          <el-input v-model="pobj.salesmanName" clearable disabled></el-input>
        </el-form-item>
        <el-form-item label="订单类型" prop="orderType">
          <el-select v-model="pobj.orderType" clearable>
            <el-option label="普通订单" :value="0"></el-option>
            <el-option label="现金订单" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单金额">
          <el-input v-model="pobj.totalPrice" clearable disabled></el-input>
        </el-form-item>
        <br/>
        <el-form-item class="me-form-memo" label="备注" prop="memo">
          <el-input type="textarea" v-model="pobj.memo" :autosize="{ minRows: 3, maxRows: 4}" maxlength="100" show-word-limit></el-input>
        </el-form-item>

        <div class="me-inner-title">
          <p>
            <span>收货地址</span>
            <el-button type="primary" round size="mini" icon="el-icon-location-information" @click.native="changeCustomerAddrDialogVisible(true)">修改地址</el-button>
          </p>
        </div>
        <div>
          <el-form-item label="收货人" prop="shConsignee">
            <el-input v-model="pobj.shConsignee" clearable disabled></el-input>
          </el-form-item>
          <el-form-item label="收货电话" prop="shConsignee">
            <el-input v-model="pobj.shPhone" clearable disabled></el-input>
          </el-form-item>
          <el-form-item label="收货省" prop="shConsignee">
            <el-input v-model="pobj.shProvince" clearable disabled></el-input>
          </el-form-item>
          <el-form-item label="收货市" prop="shConsignee">
            <el-input v-model="pobj.shCity" clearable disabled></el-input>
          </el-form-item>
          <el-form-item label="收货区" prop="shConsignee">
            <el-input v-model="pobj.shDistrict" clearable disabled></el-input>
          </el-form-item>
          <el-form-item label="详细地址" prop="shConsignee">
            <el-input v-model="pobj.shDetailedAddress" clearable disabled></el-input>
          </el-form-item>
        </div>

        <div class="me-inner-title">
          <p>
            <span>添加商品</span>
            <el-button type="primary" round size="mini" icon="el-icon-plus" @click.native.prevent="changePriceProductDialogVisible(true)">添加</el-button>
          </p>
        </div>

        <el-table :data="pobj.orderItemList" border size="mini" style="width: 100%">
          <el-table-column fixed type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="productName" label="产品名称" min-width="300">
            <template slot-scope="scope">
              {{ scope.row.productName }}
            </template>
          </el-table-column>
          <el-table-column prop="productCode" label="产品编码" min-width="130" align="center">
            <template slot-scope="scope">
              {{ scope.row.productCode }}
            </template>
          </el-table-column>
          <el-table-column label="产品型号" min-width="130" align="center">
            <template slot-scope="scope">
              {{ scope.row.productModel }}
            </template>
          </el-table-column>
          <el-table-column label="单价" width="115" align="center">
            <template slot-scope="scope">
              <span style="color: red">
                <i class="el-icon-money"></i>
                {{ scope.row.price }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="金额" width="115" align="center">
            <template slot-scope="scope">
              <span style="color: red">
                <i class="el-icon-money"></i>
                {{ scope.row.totalPrice }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="数量" width="155" align="center">
            <template slot-scope="scope">
              <el-input-number size="small" v-model="scope.row.quantity" :precision="0" @change="changeProductQuantity(scope.row)" :min="1" label="数量"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100" fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" plain icon="el-icon-delete" size="mini" round @click.native.prevent="deleteRow(scope.$index, pobj.orderItemList)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>

    <CustomerPop v-if="customerDialogVisible" :customerDialogVisible="customerDialogVisible" :changeCustomerDialogVisible="changeCustomerDialogVisible" :customerPopCallback="customerPopCallback"></CustomerPop>

    <CustomerAddressPop v-if="customerAddrDialogVisible" :customerAddrDialogVisible="customerAddrDialogVisible" :changeCustomerAddrDialogVisible="changeCustomerAddrDialogVisible" :customerAddrPopCallback="customerAddrPopCallback" :customerId="pobj.customer"></CustomerAddressPop>

    <PriceProductPop v-if="priceProductDialogVisible" :priceProductDialogVisible="priceProductDialogVisible" :changePriceProductDialogVisible="changePriceProductDialogVisible" :priceProductPopCallback="priceProductPopCallback" :customerId="pobj.customer"></PriceProductPop>
  </div>
</template>

<script>

import { save, update, detail } from '@/api/order/order'
import { getDefaultAddr } from '@/api/user/customer'

import CustomerPop from '@/views/user/customer/customer-pop'
import CustomerAddressPop from '@/views/user/customer/customer-address-pop'
import PriceProductPop from '@/views/product/product/price-product-pop'

export default {
  components: {
    CustomerPop,
    CustomerAddressPop,
    PriceProductPop
  },
  data() {
    return {
      customerDialogVisible: false,
      customerAddrDialogVisible: false,
      priceProductDialogVisible: false,
      pobj: {
        id: '',
        sn: '',
        customer: '',
        customerName: '',
        salesman: '',
        salesmanName: '',
        organization: '',
        organizationName: '',
        state: '',
        orderType: '',
        totalPrice: '',
        memo: '',
        customerAddress: '',
        shConsignee: '',
        shPhone: '',
        shProvince: '',
        shCity: '',
        shDistrict: '',
        shDetailedAddress: '',
        orderItemList: []
      },
      rules: {
        customer: [
          { required: true, message: '客户不能为空', trigger: 'blur' }
        ],
        orderType: [
          { required: true, message: '请选择订单类型' }
        ]
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.getDetail(this.$route.params.id)
    }
  },
  methods: {
    // 改变客户弹框可见
    changeCustomerDialogVisible(boo) {
      this.customerDialogVisible = boo
    },
    // 选择客户回调
    customerPopCallback(data) {
      this.resetForm()
      this.pobj.customer = data[0].id
      this.pobj.customerName = data[0].dname
      this.pobj.salesman = data[0].salesman
      this.pobj.salesmanName = data[0].salesman_name
      this.pobj.organization = data[0].organization
      this.pobj.organizationName = data[0].organization_name

      // 获取窗户默认收货地址
      getDefaultAddr(data[0].id)
        .then(response => {
          const addr = response.data
          this.pobj.customerAddress = addr.id
          this.pobj.shConsignee = addr.consignee
          this.pobj.shPhone = addr.phone
          this.pobj.shProvince = addr.province
          this.pobj.shCity = addr.city
          this.pobj.shDistrict = addr.district
          this.pobj.shDetailedAddress = addr.detailedAddress
        })
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
    // 改变产品弹框可见
    changePriceProductDialogVisible(boo) {
      if (!this.pobj.customer) {
        this.$message.warning('请先选择客户')
        return false
      }
      this.priceProductDialogVisible = boo
    },
    // 选择产品回调
    priceProductPopCallback(data) {
      for (const item of data) {
        this.pobj.orderItemList.push({
          product: item.product,
          productName: item.product_name,
          productCode: item.product_code,
          productModel: item.product_model,
          productUnit: item.product_unit,
          price: item.price,
          totalPrice: item.price,
          quantity: 1,
          productPriceId: item.product_price_id,
          productPriceName: item.product_price_name,
          productPriceGoodsItem: item.product_item_id
        })
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
          this.$router.push({ path: '/order/list' })
        })
    },
    toUpdate() {
      update(this.pobj)
        .then(response => {
          // 更新成功
          this.$message.success('更新成功')
          // 回到列表
          this.$router.push({ path: '/order/list' })
        })
    },
    getDetail(id) {
      detail(id)
        .then(response => {
          this.pobj = response.data
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
    // 改变产品行下单数量
    changeProductQuantity(row) {
      row.totalPrice = row.price * row.quantity
    }
  }
}
</script>
