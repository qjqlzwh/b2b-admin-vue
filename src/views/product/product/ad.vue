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
        <el-form-item label="产品名称" prop="dname">
          <el-input v-model="pobj.dname" clearable></el-input>
        </el-form-item>
        <el-form-item label="产品编码" prop="dcode">
          <el-input v-model="pobj.dcode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="是否上架" prop="isShelves">
          <el-radio-group v-model="pobj.isShelves">
            <el-radio border :label="true">是</el-radio>
            <el-radio border :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="产品分类" prop="category">
          <el-input v-model="pobj.categoryName" @click.native="changeCategoryDialogVisible(true)" class="me-input-prefix" prefix-icon="el-icon-search" readonly>
<!--            <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="pobj.category=''; pobj.categoryName=''" @click.stop></i>-->
          </el-input>
        </el-form-item>
        <el-form-item label="产品型号">
          <el-input v-model="pobj.model" clearable></el-input>
        </el-form-item>
        <el-form-item label="单位">
          <el-input v-model="pobj.unit" clearable></el-input>
        </el-form-item>
      </el-form>
    </el-card>

    <CategoryPop v-if="categoryDialogVisible" :categoryDialogVisible="categoryDialogVisible" :changeCategoryDialogVisible="changeCategoryDialogVisible" :categoryPopCallback="categoryPopCallback"></CategoryPop>

  </div>
</template>

<script>

import { save, update, detail } from '@/api/product/product'

import CategoryPop from '@/views/product/category/category-pop'

export default {
  components: {
    CategoryPop
  },
  data() {
    return {
      categoryDialogVisible: false,
      pobj: {
        dname: '',
        dcode: '',
        category: '',
        categoryName: '',
        model: '',
        unit: '',
        isShelves: true
      },
      rules: {
        dname: [
          { required: true, message: '请输入产品名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度多于 2 个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '产品分类不能为空' }
        ],
        isShelves: [
          { required: true, message: '是否上架' }
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
    // 改变分类弹框可见
    changeCategoryDialogVisible(boo) {
      this.categoryDialogVisible = boo
    },
    // 选择分类回调
    categoryPopCallback(data) {
      this.pobj.category = data[0].id
      this.pobj.categoryName = data[0].dname
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
          this.$message.success('添加成功')
          this.$router.push({ path: '/product/list' })
        })
    },
    toUpdate() {
      update(this.pobj)
        .then(response => {
          this.$message.success('更新成功')
          this.$router.push({ path: '/product/list' })
        })
    },
    // 重置
    resetForm(formObj) {
      this.$refs[formObj].resetFields()
    },
    getDetail(id) {
      detail(id)
        .then(response => {
          this.pobj = response.data
        })
    }
  }
}
</script>
