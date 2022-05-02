<template>
  <div>
    <el-button type="primary" @click="addUserShow = true">增加用户</el-button>
    <el-table
      :data="list"
      border
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="tel"
        label="电话"
        width="180"
      />
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      />
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="row">
          <el-button
            type="primary"
            size="mini"
            @click="delUser(row)"
          >
            删除用户
          </el-button>
          <el-button
            type="primary"
            size="mini"
            @click="updateUser(row)"
          >
            修改用户
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="增加用户" :visible.sync="addUserShow">
      <el-form :model="userForm" :rules="userFormRules">
        <el-form-item label="姓名" :label-width="userFormLabelWidth">
          <el-input v-model="userForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机" :label-width="userFormLabelWidth" prop="tel">
          <el-input v-model="userForm.tel" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="userFormLabelWidth" prop="email">
          <el-input v-model="userForm.email" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserShow = false">取 消</el-button>
        <el-button type="primary" @click="submitUserForm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="更新用户" :visible.sync="updateUserShow">
      <el-form :model="updateUserForm" :rules="userFormRules">
        <el-form-item label="姓名" :label-width="userFormLabelWidth">
          <el-input v-model="updateUserForm.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机" :label-width="userFormLabelWidth" prop="tel">
          <el-input v-model="updateUserForm.tel" autocomplete="off" />
        </el-form-item>
        <el-form-item label="邮箱" :label-width="userFormLabelWidth" prop="email">
          <el-input v-model="updateUserForm.email" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateUserShow = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdateUserForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { get_users, create_user, delete_user, update_user } from '@/api/users'

export default {
  name: 'App',
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      list: null,
      addUserShow: false,
      updateUserShow: false,
      userForm: {
        name: '',
        tel: '',
        email: ''
      },
      updateUserForm: {
        id: '',
        name: '',
        tel: '',
        email: ''
      },
      userFormLabelWidth: '120px',
      userFormRules: {
        tel: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      get_users().then(res => {
        this.list = res.data
      })
    },
    submitUserForm() {
      const data = {
        name: this.userForm.name,
        tel: this.userForm.tel,
        email: this.userForm.email
      }
      create_user(data).then(res => {
        if (res.code === 20000) {
          this.addUserShow = false
          this.list.push(data)
        }
      })
    },
    delUser(row) {
      delete_user(row.row.id).then(res => {
        console.log(res)
        if (res.code === 20000) {
          this.list = this.list.filter(({ id }) => id !== row.row.id)
        }
      })
    },
    updateUser(row) {
      console.log(row.$index)
      this.updateUserShow = true
      this.updateUserForm = {
        index: row.$index,
        id: row.row.id,
        name: row.row.name,
        tel: row.row.tel,
        email: row.row.email
      }
    },
    submitUpdateUserForm() {
      update_user(this.updateUserForm.id, this.updateUserForm).then(res => {
        if (res.code === 20000) {
          this.$set(this.list, this.updateUserForm.index, this.updateUserForm)
          this.updateUserShow = false
        }
      })
    }
  }
}

</script>
