<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      {{ item.name }}
    </div>
    <el-button type="primary" @click="changeValueSet">改变</el-button>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      list: [
        { name: '张三', id: 1 },
        { name: '王五', id: 2 }
      ]
    }
  },
  created() {

  },
  methods: {
    changeValue() {
      this.list[1] = { name: '李四', id: 1 }
      console.log(this.list)
    },
    changeValueSet() {
      const a = { name: '李四', id: 1 }
      this.$set(this.list, 1, a)
      console.log(this.list)
    }
  }
}

</script>
