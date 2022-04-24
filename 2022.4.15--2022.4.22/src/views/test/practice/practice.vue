<template>
  <div id="app">
    <div class="add">
      <input v-model="title" type="text" placeholder="标题">
      <input v-model="user" type="text" placeholder="发布人">
      <input v-model="datas" type="date" placeholder="发布时间">
      <button @click="add()">新增</button>
      <table cellpadding="0" cellspacing="0">
        <thead>
          <tr>
            <th>序号</th>
            <th>标题</th>
            <th>发布人</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for-key="list in lists">
            <td>1</td>
            <td>{{ list.title }}</td>
            <td>{{ list.user }}</td>
            <td>{{ list.dates }}</td>
            <td>
              <span class="delete">删除</span>
              <span class="edit">编辑</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
<script>

export default ({
  name: 'App',
  data: function() {
    return { // 数据
      title: '',
      user: '',
      dates: '',
      lists: [{ title: '标题1', user: 'amy', datas: '2022-4-20' }]
    }
  },
  methods: { // 方法
    add: function() {
      this.lists.push({
        title: this.title,
        user: this.user,
        datas: this.dates
      })
      this.title = ''
      this.user = ''
      this.dates = ''
    }
  }
})
</script>
<style>

</style>
