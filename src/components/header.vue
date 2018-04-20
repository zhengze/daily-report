<template>
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'" >
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="1">
        <div class="tools" @click.prevent="collapse" @click='handleCollapsed(collapsed)'>
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="9">
        <el-menu :default-active="activeIndex" class="el-menu-header" mode="horizontal" text-color="#000"
          active-text-color="#ffd04b" @select="handleselect">
          <el-menu-item index="1"><router-link :to="{name: 'Index'}" tag="li">首页</router-link></el-menu-item>
          <el-menu-item index="2" class="myreport-menu" v-if="!myReportHidden"><router-link :to="{name: 'MyReport'}" tag="li">我的日报</router-link></el-menu-item>
          <el-menu-item index="3" class="myreport-menu" v-if="!myReportHidden"><router-link :to="{name: 'WriteReport'}" tag="li">写日报</router-link></el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner"><img src="../assets/user.png" /></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{sysUserName}}</el-dropdown-item>
            <el-dropdown-item>消息(5)</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
</template>
<script>
export default {
  data () {
    return {
      sysName: 'DailyReport',
      collapsed: false,
      sysUserName: '',
      sysUserAvatar: '',
      myReportHidden: false
    }
  },
  props: [
    'activeIndex'
  ],
  methods: {
    handleCollapsed () {
      this.$emit('nav-collapsed', this.collapsed)
    },
    onSubmit () {
      console.log('submit!')
    },
    handleselect () {
    },
    // 退出登录
    logout () {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {
        // type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('user')
        _this.$router.push('/login')
      }).catch(() => {
      })
    },
    // 折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed
    }
  },
  mounted () {
    let user = JSON.parse(sessionStorage.getItem('user'))
    if (user) {
      this.sysUserName = user.username
      let isAdmin = user.username === 'admin'
      this.myReportHidden = isAdmin === true
    }
  }
}
</script>
<style scoped lang="scss">
    .header {
      height: 60px;
      line-height: 60px;
      background: #20a0ff;
      color:#fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        //width:230px;
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color:#fff;
        }
      }
      .logo-width{
        width:230px;
      }
      .logo-collapse-width{
        width:60px
      }
      .tools{
        padding: 0px 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
      .el-menu-header{
        background-color: #20a0ff;
      }
    }
</style>
