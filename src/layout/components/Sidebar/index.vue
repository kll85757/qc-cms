<template>
  <el-menu
    :default-active="activeMenu"
    :collapse="isCollapse"
    mode="vertical"
    @select="handleMenuSelect"
  >
    <el-menu-item
      v-for="item in menuItems"
      :key="item.index"
      :index="item.index"
    >
      <i :class="item.icon"></i>
      <span>{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: '/albums', // 默认设置为 "/albums"（可以根据需求修改）
      isCollapse: false, // 控制菜单是否折叠
      menuItems: [
        { index: '/news', title: '新闻管理', icon: 'el-icon-news' },
        { index: '/products', title: '产品管理', icon: 'el-icon-goods' },
        { index: '/albums', title: '相册管理', icon: 'el-icon-picture' },
        { index: '/brands', title: '品牌管理', icon: 'el-icon-star-on' },
        { index: '/visitors', title: '访客统计', icon: 'el-icon-user-solid' },
        { index: '/users', title: '用户管理', icon: 'el-icon-user' }
      ]
    };
  },
  methods: {
    handleMenuSelect(index) {
      this.activeMenu = index; // 设置选中的菜单
      this.$router.push(index); // 使用 Vue Router 切换路由
    }
  },
  watch: {
    // 监听路由变化，确保菜单高亮
    $route(to) {
      // 这里需要使用 `to.path`，确保匹配 `hash` 模式下的路径
      this.activeMenu = to.path;
    }
  },
  mounted() {
    // 页面加载时初始化菜单的高亮状态，确保根据当前路由设置选中菜单项
    this.activeMenu = this.$route.path;
  }
};
</script>
