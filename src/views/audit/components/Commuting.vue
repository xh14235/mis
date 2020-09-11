<template>
  <div class="page-box commuting-wrapper">
    <van-collapse v-model="activeNames">
      <van-collapse-item title="标题1" name="1">内容</van-collapse-item>
      <van-collapse-item title="标题2" name="2">内容</van-collapse-item>
      <van-collapse-item title="标题3" name="3">内容</van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  name: "Commuting",
  data() {
    return {
      activeNames: ["1"]
    };
  }
};
</script>

<style lang="stylus" scoped></style>
