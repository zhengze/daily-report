<template>
  <el-row class="container">
    <headerComponent :activeIndex="activeIndex"></headerComponent>
  <el-main>
      <el-row class="write-report">
        <a href="#"><el-button type="primary">写日报</el-button></a>
      </el-row>
    <el-row>
    <el-col :span="24" class="toolbar" v-loading="loading">
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
import headerComponent from '../components/header'
import { getMyReportList } from '../api/api'
export default {
  data () {
    return {
      reports: [],
      activeIndex: '2',
      currentPage: 1,
      pageSize: 10,
      loading: true
    }
  },
  components: {
    headerComponent
  },
  methods: {
    getMyReports: function () {
      let user = JSON.parse(sessionStorage.getItem('user'))
      let para = JSON.stringify({
        uid: user.id,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      getMyReportList(para).then((res) => {
        this.reports = res.data.myreports_list
        this.loading = false
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
    this.getMyReports()
  },
  watch: {
    currentPage: {
      handler () {
        this.getMyReports()
      }
    },
    pageSize: {
      handler () {
        this.getMyReports()
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    .el-main {
      top: 60px;
      bottom: 0px;
      .el-row {
        height: 500px;
        padding-left: 200px;
        padding-right: 200px;
        .myreport {
          text-align: left;
          margin-bottom: 20px;
        }
      }
      .write-report {
        float: left;
        height: 100%;
      }
    }
  }
</style>
