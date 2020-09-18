<template>
  <div class="page-wrapper">
    <CommonHeader></CommonHeader>
    <Crumb></Crumb>
    <router-view></router-view>
    <CommonFooter></CommonFooter>
  </div>
</template>

<script>
export default {
  name: "Limit",
  components: {
    CommonHeader: () => import("@/components/CommonHeader"),
    Crumb: () => import("@/components/Crumb"),
    CommonFooter: () => import("@/components/CommonFooter")
  }
};
</script>

<style lang="stylus" scoped></style>
