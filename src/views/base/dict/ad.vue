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
        <el-form-item label="词汇名称" prop="dname">
          <el-input v-model="pobj.dname" clearable></el-input>
        </el-form-item>
        <el-form-item label="词汇编码" prop="dcode">
          <el-input v-model="pobj.dcode" clearable></el-input>
        </el-form-item>
        <br>
        <el-form-item label="是否启用" prop="isEnabled">
          <el-radio-group v-model="pobj.isEnabled">
            <el-radio border label="true">是</el-radio>
            <el-radio border label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number v-model="pobj.sort" :min="1" :max="9999" label="排序"></el-input-number>
        </el-form-item>
        <br>
        <el-form-item class="me-form-memo" label="备注" prop="memo">
          <el-input type="textarea" v-model="pobj.memo" :autosize="{ minRows: 3, maxRows: 4}" maxlength="100" show-word-limit></el-input>
        </el-form-item>

        <div class="me-inner-title">
          <p>
            <span>添加子项</span>
            <el-button type="primary" round size="mini" icon="el-icon-plus" @click.native.prevent="addRow(pobj.childDict)">添加</el-button>
          </p>
        </div>

        <el-table :data="pobj.childDict" border size="mini" style="width: 100%">
          <el-table-column fixed type="index" width="50" align="center"></el-table-column>
          <el-table-column prop="dname" label="词汇名称" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.dname" size="small" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="secondCode" label="二级编码" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.secondCode" size="small" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="isEnabled" label="是否启用" width="150">
            <template slot-scope="scope">
              <el-radio-group v-model="scope.row.isEnabled">
                <el-radio label="true">是</el-radio>
                <el-radio label="false">否</el-radio>
              </el-radio-group>
            </template>
          </el-table-column>
          <el-table-column prop="memo" label="备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.memo" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" fixed="right">
            <template slot-scope="scope">
              <el-button type="danger" plain icon="el-icon-delete" size="mini" round @click.native.prevent="deleteRow(scope.$index, pobj.childDict)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form>
    </el-card>
  </div>
</template>

<script>

import { save, update, getDict } from '@/api/base/dict'

export default {
  data() {
    return {
      pobj: {
        dname: '',
        dcode: '',
        isEnabled: 'true',
        childDict: []
      },
      rules: {
        dname: [
          { required: true, message: '请输入词汇名称', trigger: 'blur' },
          { min: 2, max: 50, message: '长度多于 2 个字符', trigger: 'blur' }
        ],
        dcode: [
          { required: true, message: '请输入词汇编码', trigger: 'blur' },
          { min: 3, max: 50, message: '长度多于 2 个字符', trigger: 'blur' }
        ],
        sort: [
          { type: 'number', message: '必须为数字值' }
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
    resetForm(formObj) {
      this.$refs[formObj].resetFields()
    },
    // 删除行
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    addRow(rows) {
      rows.push({
        isEnabled: 'true'
      })
    },
    // 根据id获取字典
    getDict(id) {
      getDict(id)
        .then(response => {
          this.pobj = response.data
          this.pobj.isEnabled = this.pobj.isEnabled.toString()
          this.pobj.childDict.filter(item => {
            item.isEnabled = item.isEnabled.toString()
          })
        })
    }
  }
}
</script>
