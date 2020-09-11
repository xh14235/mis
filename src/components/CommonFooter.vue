<template>
  <div class="common-footer">
    <span class="author">&copy; 2020 昱章电气</span>
    <span class="version">V1.0</span>
  </div>
</template>

<script>
export default {
  name: "CommonFooter"
};
</script>

<style lang="stylus" scoped>
.common-footer
  position: absolute
  left: 0
  bottom: 0
  width: 100%
  line-height: 4rem
  display: flex
  justify-content: space-around
  align-items: center
  font-size: 1.2rem
</style>
