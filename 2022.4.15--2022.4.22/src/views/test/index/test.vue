<template>
  <div>

    <el-table
      :data="list"
      highlight-current-row
      border
      style="width: 100%"
    >
      <el-table-column
        label="序号"
        type="index"
        width="50"
      />
      <el-table-column
        prop="student.name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="student.student_number"
        label="学号"
        width="180"
      />
      <el-table-column
        prop="student.faculty"
        label="专业"
        width="180"
      />
      <el-table-column
        :prop="perTitleTotal"
        :label="perTitle"
        width="180"
      />
      <el-table-column
        prop="total"
        label="总分"
        width="180"
      />
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row }">
          <el-button
            type="primary"
            size="mini"
            @click="checkPaper(row)"
          >
            查看试卷
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="showPaper">
      <el-form
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="90px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="姓名">
          <el-input
            v-model="temp.name"
            :rows="1"
            :disabled="true"
          />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

import { getBianxi, getTeacherExam, getTeacherExamTest } from '@/api/test'
import { mergePaperInfo } from '@/utils/exam'

export default {
  name: 'App',
  data() {
    return {
      list: [],
      showPaper: false,
      temp: {
        total: 0
      },
      perTitle: '', // 教师可以改的题目名称
      perTitleTotal: '', // 教师可以改的题目总分
      titlesDict: { 'differentiate': '辨析题得分', 'simple': '简答题得分', 'discuss': '论述题得分' }, // 题目中英文对应字典
      image1: '',
      image2: ''
    }
  },
  created() {
    this.getTeacherExamTest()
  },
  methods: {
    getList() {
      const that = this
      getBianxi().then(res => {
        Object.keys(res.data['items']).forEach(function(key) {
          that.list = res.data['items'][key]
        })
      })
    },
    getTeacherExam() {
      const that = this
      getTeacherExam().then(res => {
        that.list = mergePaperInfo(res.data['items'], res.data['student_info'])
        console.log(that.list)
        console.log(res.data)
      })
    },
    getTeacherExamTest() {
      const that = this
      getTeacherExamTest().then(res => {
        console.log(res.data['items'][0])
        const r = res.data['items'][0]
        const perTitle = r.teacher_permissions[r.user.id]
        that.perTitle = that.titlesDict[perTitle]
        that.perTitleTotal = perTitle
        Object.keys(res.data['items']).forEach(function(key) {
          that.list.push(res.data['items'][key])
        })
      })
    },
    checkPaper(row) {
      console.log(row)
      this.showPaper = true
    }
  }
}

</script>

