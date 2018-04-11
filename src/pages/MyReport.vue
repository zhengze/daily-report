<template>
  <el-row class="container">
    <headerComponent :activeIndex="activeIndex"></headerComponent>
  <el-main>
    <el-row v-for="(item, index) in reports" :key="index">
      <el-card class="box-card">
        <div slot="header">
          {{item.created_time}}
        </div>
        <div>
          <code>{{item.content}}</code>
        </div>
      </el-card>
    </el-row>
    <el-row>
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        :total="50"
      >
      </el-pagination>
    </el-col>
    </el-row>
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
      let user = JSON.parse(sessionStorage.getItem('user'))
      let para = JSON.stringify({
        uid: user.id
      })
      getMyReportList(para).then((res) => {
        this.reports = res.data.myreports
      })
    }
  },
  mounted () {
    this.getMyReports()
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
      .el-row {
        .box-card {
          text-align: left;
          width: 480px;
        }
      }
    }
  }
</style>
