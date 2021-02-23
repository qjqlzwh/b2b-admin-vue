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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="pobj.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="pobj.password" clearable show-password></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="isEnabled">
          <el-radio-group v-model="pobj.isEnabled">
            <el-radio border :label="true">是</el-radio>
            <el-radio border :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="pobj.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户类型" prop="userType">
          <el-select v-model="pobj.userType" clearable >
            <el-option label="内部用户" :value="0"></el-option>
            <el-option label="企业用户" :value="1"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
    </el-card>
  </div>
</template>

<script>

import { save, update, detail } from '@/api/user/usercenter'

export default {
  data() {
    return {
      pobj: {
        username: '',
        password: '',
        isEnabled: 'true',
        phone: '',
        userType: '0'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 50, message: '长度不能少于 2 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 50, message: '长度不能少于 6 个字符', trigger: 'blur' }
        ],
        userType: [
          { required: true, message: '必须先一个', trigger: 'change' }
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
          this.$router.push({ path: '/usercenter/list' })
        })
    },
    toUpdate() {
      update(this.pobj)
        .then(response => {
          this.$message.success('更新成功')
          this.$router.push({ path: '/usercenter/list' })
        })
    },
    getDetail(id) {
      detail(id)
        .then(response => {
          this.pobj = response.data
        })
    },
    // 重置
    resetForm(formObj) {
      this.$refs[formObj].resetFields()
    }
  }
}
</script>
