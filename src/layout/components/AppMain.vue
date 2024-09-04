<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <!-- 尝试暂时移除 keep-alive -->
      <router-view @hook:mounted="onComponentMounted" :key="key" style="border: 2px solid red; background-color: rgba(255, 0, 0, 0.1);" />
    </transition>
    <div>Current Key: {{ key }}</div> <!-- 用于调试 -->
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.fullPath; // 使用 fullPath 包括查询参数
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log('Entering route:', to.path);
    next();
  },
  methods: {
    onComponentMounted() {
      console.log('Component mounted for route:', this.$route.path);
    }
  }
}
</script>


<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
