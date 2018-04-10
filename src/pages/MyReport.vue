<template>
  <el-row class="container">
    <headerComponent :activeIndex="activeIndex"></headerComponent>
  <el-main>
    <ul>
      <li v-for="(item, index) in reports" :key="index">
      <p>{{item.created_time}}</p>
      <p>{{item.content}}</p>
    <hr/>
    </li>
    </ul>
    <div class="block">
      <el-pagination
        layout="prev, pager, next"
        :total="50"
      >
      </el-pagination>
    </div>
  </el-main>
  </el-row>
</template>
<script>
import headerComponent from '../components/header'
import { getMyReportList } from '../api/api'
export default {
  data () {
    return {
      reports: [],
      activeIndex: '2'
    }
  },
  components: {
    headerComponent
  },
  methods: {
    getMyReports: function () {
      let para = JSON.stringify({
        uid: sessionStorage.getItem('user').id
      })
      getMyReportList(para).then((res) => {
        this.reports = res.data.myreports
      })
    }
  },
  mounted () {
    this.getMyReports()
    this.sysUserName = JSON.parse(sessionStorage.getItem('user')).username
  }
}
</script>
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .el-main {
      display: flex;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      padding-left: 30px;
      padding-right: 30px;
    }
  }
</style>
