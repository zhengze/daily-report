<template>
  <el-row class="container">
    <headerComponent
      :activeIndex="activeIndex"
      @nav-collapsed="onNavCollapsed"
    >
    </headerComponent>
    <el-col :span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <!--导航菜单-->
        <el-menu :default-active="'1'" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
           unique-opened :collapse="collapsed">
          <template v-for="(item,index) in organization">
            <el-submenu :index="index+''" :key="item.id">
              <template slot="title"><i class="fa fa-bars"></i>{{item.department}}</template>
              <el-menu-item v-for="(child, index) in item.member" :index="index+''" :key="child.id">
                <router-link :to="{name: 'UserReport', params:{userId: child.id}}">{{child.cname}}</router-link>
              </el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import headerComponent from '../components/header'
import { getOrganization } from '../api/api'
export default {
  data () {
    return {
      collapsed: false,
      activeIndex: '1',
      sysUserName: '',
      organization: []
    }
  },
  components: {
    headerComponent
  },
  methods: {
    handleopen () {
      // console.log('handleopen')
    },
    handleclose () {
      // console.log('handleclose')
    },
    handleselect () {
    },
    onNavCollapsed (collapsed) {
      this.collapsed = collapsed
    },
    getOrganization () {
      getOrganization().then((res) => {
        this.organization = res.data.organization.data
      })
    }
  },
  mounted () {
    this.getOrganization()
  }
}
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .main {
      display: flex;
      // background: #324057;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex:0 0 230px;
        width: 230px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
        overflow: auto;
        .el-menu{
          height: 100%;
        }
        .collapsed{
          width:60px;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
          }

        }
      }
      .menu-collapsed{
        flex:0 0 60px;
        width: 60px;
      }
      .menu-expanded{
        flex:0 0 230px;
        width: 230px;
      }
      .content-container {
        // background: #f1f2f7;
        flex:1;
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // bottom: 0px;
        // left: 230px;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
          //margin-bottom: 15px;
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }
</style>
