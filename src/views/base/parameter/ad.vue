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
        <el-form-item label="参数名称" prop="dname">
          <el-input v-model="pobj.dname" clearable></el-input>
        </el-form-item>
        <el-form-item label="参数编码" prop="dcode">
          <el-input v-model="pobj.dcode" clearable></el-input>
        </el-form-item>
        <el-form-item label="参数值" prop="dvalue">
          <el-input v-model="pobj.dvalue" clearable></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="isEnabled">
          <el-radio-group v-model="pobj.isEnabled">
            <el-radio border :label="true">是</el-radio>
            <el-radio border :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <br/>
        <el-form-item class="me-form-memo" label="备注" prop="memo">
          <el-input type="textarea" v-model="pobj.memo" :autosize="{ minRows: 3, maxRows: 4}" maxlength="100" show-word-limit></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import { save, update, detail } from '@/api/base/parameter'

export default {
  data() {
    return {
      pobj: {
        dname: '',
        dcode: '',
        dvalue: '',
        isEnabled: true
      },
      rules: {
        dname: [
          { required: true, message: '请输入参数名称', trigger: 'blur' }
        ],
        dcode: [
          { required: true, message: '请输入参数编码', trigger: 'blur' }
        ],
        dvalue: [
          { required: true, message: '请输入参数值', trigger: 'blur' }
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
          this.$router.push({ path: '/parameter/list' })
        })
    },
    toUpdate() {
      update(this.pobj)
        .then(response => {
          this.$message.success('更新成功')
          this.$router.push({ path: '/parameter/list' })
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
      location.reload()
      // this.$refs[formObj].resetFields()
    }
  }
}
</script>
