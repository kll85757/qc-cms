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
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      activeMenu: '/news', // 初始化为第一个菜单项的路径
      isCollapse: false, // 初始化为未折叠状态
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
      this.activeMenu = index; // 更新 activeMenu 以确保菜单高亮
      this.$router.push(index);
    }
  }
};
</script>
