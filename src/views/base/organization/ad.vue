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
        <el-form-item label="机构名称" prop="dname">
          <el-input v-model="pobj.dname" clearable></el-input>
        </el-form-item>
        <el-form-item label="机构编码" prop="dcode">
          <el-input v-model="pobj.dcode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="上级机构" prop="parentId">
          <el-input v-model="pobj.parentName" @click.native="orgDialogVisible = true" class="me-input-prefix" prefix-icon="el-icon-search" readonly>
            <i slot="suffix" class="el-input__icon el-icon-circle-close" @click="pobj.parentId=''; pobj.parentName=''" @click.stop></i>
          </el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="isEnabled">
          <el-radio-group v-model="pobj.isEnabled">
            <el-radio border label="true">是</el-radio>
            <el-radio border label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <br>
        <el-form-item class="me-form-memo" label="备注:" prop="memo">
          <el-input type="textarea" v-model="pobj.memo" style="width: 600px; " :autosize="{ minRows: 3, maxRows: 4}" maxlength="100" show-word-limit></el-input>
        </el-form-item>
      </el-form>
    </el-card>

    <OrgPop v-if="orgDialogVisible" :orgDialogVisible="orgDialogVisible" :changeOrgDialogVisible="changeOrgDialogVisible" :orgPopCallback="orgPopCallback"></OrgPop>
  </div>
</template>

<script>

import { save, update, detail } from '@/api/base/organization'
import OrgPop from '@/views/base/organization/orgPop'

export default {
  components: { OrgPop },
  data() {
    return {
      dialogVisible: false,
      orgDialogVisible: false,
      pobj: {
        dname: '',
        dcode: '',
        parentId: '',
        parentName: '',
        isEnabled: 'true',
        memo: ''
      },
      rules: {
        dname: [
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度多于 2 个字符', trigger: 'blur' }
        ],
        sort: [
          { type: 'number', message: '必须为数字值' }
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
    // 改变机构弹框可见
    changeOrgDialogVisible(boo) {
      this.orgDialogVisible = boo
    },
    // 选择上级机构回调
    orgPopCallback(data) {
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
          this.$router.push({ path: '/organization/list' })
        })
    },
    toUpdate() {
      update(this.pobj)
        .then(response => {
          this.$message.success('更新成功')
          this.$router.push({ path: '/organization/list' })
        })
    },
    // 重置
    resetForm(formObj) {
      this.$refs[formObj].resetFields()
    },
    // 根据id获取字典
    getDetail(id) {
      detail(id)
        .then(response => {
          this.pobj = response.data
          this.pobj.isEnabled = this.pobj.isEnabled.toString()
        })
    }
  }
}
</script>
