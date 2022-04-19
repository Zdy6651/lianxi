<template>
  <div>
    <el-form
      ref="dataForm"
      class="form-container"
      label-position="top"
    >
      <div
        v-for="(item, index) in tExamInfo"
        :key="'tExamInfo' + index"
      >
        <el-form-item
          :label="item['标签']"
        >
          <div
            v-for="(questionItem, x) in item['题目列表']"
            :key="'timu' + x"
          >
            <span>
              {{ questionItem.questionTitle }}
            </span>
            <el-input
              v-for="(pointItem, b) in questionItem.pointList"
              :key="'input'+ b"
              v-model="pointItem.pointAnswerText"
              :placeholder="pointItem.pointTitle"
            />
          </div>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      tExamInfo: [
        {
          '标签': '简答题',
          '得分点': 3,
          '题目数': 3
        },
        {
          '标签': '辨析题',
          '得分点': 2,
          '题目数': 2
        }
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      console.log(this.tExamInfo)
      this.tExamInfo.forEach((item, index) => {
        const questionLength = item['题目数']
        const questionPointLength = item['得分点']
        const questionList = []
        for (let i = 0; i < questionLength; i++) {
          const questionItem = {}
          questionItem['questionTitle'] = `${item['标签']}${i + 1}`
          questionItem['pointList'] = []
          for (let j = 0; j < questionPointLength; j++) {
            questionItem['pointList'].push({
              pointTitle: `得分点${j + 1}`,
              pointAnswerText: ''
            })
          }
          questionList.push(questionItem)
        }
        this.$set(item, '题目列表', questionList)
      })
    }
  }
}

</script>
