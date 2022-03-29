<template>
  <div class="home">
    <el-container>
      <el-aside>
        <el-menu :router="true">
          <el-menu-item index="/">
            <span slot="title">el后台管理系统</span>
          </el-menu-item>
          <!-- 一级菜单 -->
          <el-menu-item index="/homeindex">
            <i class="el-icon-eleme"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-home"></i>文章管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1">
                <i class="el-icon-stopwatch"></i>
                文章管理</el-menu-item
              >
              <el-menu-item index="2-2">
                <i class="el-icon-stopwatch"></i>
                多层级路由示例</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <!-- 面包屑 -->
          <div class="title">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item
                v-for="(item, index) in this.$route.meta"
                :key="index"
                :to="{ path: '/' }"
                >{{ item }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          
          <!--  -->
        </el-header>
        
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {},
  methods: {},
  created() {},
};
</script>
<style scoped>
.header{
  padding: 0;
}
.header .title{
  width: 100%;
  height: 60px;
  padding: 0 40px;
  box-sizing: border-box;
  background: #ddd;
  display: flex;
  align-items: center;
}

</style>