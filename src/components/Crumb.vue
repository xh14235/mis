<template>
  <div class="crumb-wrapper">
    <div class="position">{{ title }}</div>
    <div class="number">
      <span class="description">待处理</span>
      <span class="num">12</span>
      <span class="unit">件</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Crumb",
  computed: {
    title() {
      let path = this.$route.path;
      let title = "";
      switch (path) {
        case "/nav":
          title = "首页";
          break;
        case "/commuting/gotowork":
          title = "上下工管理-生产上工";
          break;
        case "/commuting/gooffwork":
          title = "上下工管理-生产下工";
          break;
        case "/commuting/incomplete":
          title = "上下工管理-未完成信息";
          break;
        case "/audit/commuting":
          title = "生产审核-上下工审核";
          break;
        default:
          title = "111";
          break;
      }
      return title;
    }
  }
};
</script>

<style lang="stylus" scoped>
.crumb-wrapper
  width: 100%
  height: 4rem
  padding: 0 1rem
  background: #BFBFBF
  display: flex
  justify-content: space-between
  align-items: center
  font-size: 1.4rem
  .position
    color: #ffffff
  .number
    .description
      color: #205867
    .num
      color: #EA700D
      padding: 0 1rem
    .unit
      color: #858585
</style>
