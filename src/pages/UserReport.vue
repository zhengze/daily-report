<template>
  <el-row class="container">
  <el-main>
    <el-row>
    <el-col :span="24" class="breadcrumb-container">
      <strong class="title"></strong>
      <!--
      <el-breadcrumb separator="/" class="breadcrumb-inner">
        <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
          {{ item.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      -->
    </el-col>
    <el-col :span="24" class="toolbar" v-loading="loading">
      <p>{{$route.query.cname}}
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
      pageSize: 10,
      loading: true
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.userId = to.params.userId
    next()
  },
  methods: {
    getReports () {
      let user = JSON.parse(sessionStorage.getItem('user'))
      let para = JSON.stringify({
        uid: user.id,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      getReportList(para).then((res) => {
        this.reports = res.data.reportsList
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
    '$route': {
      handler () {
        this.getReports()
      }
    }
  }
}
</script>
<style scoped lang="scss">
.container {
  position: absolute;
  overflow: auto;
  top: 0px;
  bottom: 0px;
  .el-main {
    width: 80%;
    top: 0px;
    .el-row {
      text-align: left;
    }
  }
}

</style>
