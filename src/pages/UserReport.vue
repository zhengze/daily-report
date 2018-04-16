<template>
  <el-row class="container">
  <el-main>
    <el-row>
    <el-col :span="24" class="toolbar">
      <p>{{$route.params.userId}}
      <div class="myreport" v-for="(item, index) in reports.data" :key="index">
        <p><i class="fa fa-calendar-times-o"></i>{{item.created_time}}</p>
        <code>{{item.content}}</code>
        <hr/>
      </div>
      <div>
      <el-pagination
        class="pull-right clearfix"
        layout="total, sizes, prev, pager, next, jumper"
        :page-size="reports.pageSize"
        :total="reports.count"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
      </div>
    </el-col>
    </el-row>
  </el-main>
  </el-row>
</template>
<script>
import { getReportList } from '../api/api'
export default {
  data () {
    return {
      userId: this.$route.params.userId,
      reports: [],
      currentPage: 1,
      pageSize: 10
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.userId = to.params.userId
    next()
  },
  beforeRouteEnter (to, from, next) {
    this.getReports()
  },
  methods: {
    getReports: function () {
      let user = JSON.parse(sessionStorage.getItem('user'))
      let para = JSON.stringify({
        uid: user.id,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      getReportList(para).then((res) => {
        this.reports = res.data.reportsList
      })
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
    }
  },
  mounted () {
    this.getReports()
  },
  watch: {
    currentPage: {
      handler () {
        this.getReports()
      }
    },
    pageSize: {
      handler () {
        this.getReports()
      }
    },
    '$route': 'getReports'
  }
}
</script>
<style scoped lang="scss">
.el-main {
  top: 0px;
  overflow: auto;
  .el-row {
    overflow: auto;
  }
}
  
</style>
