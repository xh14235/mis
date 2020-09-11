<template>
  <div class="common-header">
    <div class="logo">
      <img src="../assets/img/logo2.png" alt />
      <b>Regeon MIS</b>
    </div>
    <div class="control">
      <span class="user-name">{{ userName }}</span>
      <van-icon name="wap-nav" @click="toggleNavPopup()" />
    </div>
    <transition name="right-move">
      <NavPopup v-if="navPopupShow"></NavPopup>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonHeader",
  components: {
    NavPopup: () => import("@/components/NavPopup")
  },
  computed: {
    ...mapState(["userName", "navPopupShow"])
  },
  methods: {
    ...mapMutations(["toggleNavPopup"])
  }
};
</script>

<style lang="stylus" scoped>
.common-header
  width: 100%
  height: 4rem
  padding: 0 1rem
  background: #505563
  display: flex
  justify-content: space-between
  align-items: center
  color: #fff
  .logo
    img
      height: 2.5rem
      margin-right: 1rem
    b
      font-size: 1.4rem
  .control
    position: relative
    display: flex
    align-items: center
    height: 4rem
    i
      font-size: 1.8rem
    .user-name
      padding: 0 1rem
      font-size: 1.4rem
</style>
