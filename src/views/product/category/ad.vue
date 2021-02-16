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
        <el-form-item label="分类名称" prop="dname">
          <el-input v-model="pobj.dname" clearable></el-input>
        </el-form-item>
        <el-form-item label="上级分类" prop="parentId">
          <el-input v-model="pobj.parentName" @click.native="categoryDialogVisible = true" class="me-input-prefix" prefix-icon="el-icon-search" readonly>
            <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="pobj.parentId=''; pobj.parentName=''" @click.stop></i>
          </el-input>
        </el-form-item>
      </el-form>
    </el-card>

  </div>
</template>

<script>

import { save, update, detail } from '@/api/product/category'

export default {
  components: { },
  data() {
    return {
      categoryDialogVisible: false,
      pobj: {
        dname: '',
        parentId: '',
        parentName: ''
      },
      rules: {
        dname: [
          { required: true, message: '请输入产品分类名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度多于 2 个字符', trigger: 'blur' }
        ],
        parentId: [
          { required: true, message: '请选择产品分类' }
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
      this.pobj.parentId = data[0].id
      this.pobj.parentName = data[0].dname
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
          this.$router.push({ path: '/category/list' })
        })
    },
    toUpdate() {
      update(this.pobj)
        .then(response => {
          this.$message.success('更新成功')
          this.$router.push({ path: '/category/list' })
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
