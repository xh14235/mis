<template>
  <div class="nav-popup-wrapper">
    <van-button type="info" icon="weapp-nav" block @click="toHome()">
      首页
    </van-button>
    <van-collapse v-model="activeName" accordion>
      <van-collapse-item
        v-for="item1 of navList"
        :title="item1.name"
        :name="item1.id"
        :key="item1.id"
      >
        <ul class="nav2-list">
          <li
            v-for="item2 of item1.children"
            :key="item2.id"
            @click="changeRouter(item2.route)"
          >
            {{ item2.name }}
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>
    <van-button type="info" icon="share" block @click="logout()">
      退出
    </van-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "NavPopup",
  data() {
    return {
      activeName: "1",
      navList: [
        {
          id: "1",
          name: "上下工管理",
          children: [
            {
              id: "11",
              name: "生产上工",
              route: "/commuting/gotowork"
            },
            {
              id: "12",
              name: "生产下工",
              route: "/commuting/gooffwork"
            },
            {
              id: "13",
              name: "未完成信息",
              route: "/commuting/incomplete"
            }
          ]
        },
        {
          id: "2",
          name: "生产审核",
          children: [
            {
              id: "21",
              name: "上下工审核",
              route: "/audit/commuting"
            }
          ]
        },
        {
          id: "3",
          name: "查询/报表",
          children: [
            {
              id: "31",
              name: "工时报表",
              route: "/commuting/gooffwork"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState(["navPopupShow"])
  },
  methods: {
    ...mapMutations(["hideNavPopup"]),
    changeRouter(route) {
      if (this.$route.fullPath !== route) {
        this.$router.push({ path: route });
      }
      this.hideNavPopup();
    },
    toHome() {
      this.$router.push({ path: "/nav" });
      this.hideNavPopup();
    },
    logout() {
      this.userNavShow = false;
      localStorage.token = "";
      this.$store.state.token = "";
      this.$router.push("/");
      this.hideNavPopup();
    }
  }
};
</script>

<style lang="stylus" scoped>
.nav-popup-wrapper >>> .van-collapse-item__content
  background: transparent
  color: #fff
  font-size: 1.2rem
.nav-popup-wrapper >>> .van-cell
  background: transparent
  color: #fff
.nav-popup-wrapper >>> .nav2-list li
  padding-left: 2rem
  font-size: 1.4rem
.nav-popup-wrapper
  position: fixed
  top: 4rem
  right: 0
  width: 50%
  height: calc( 100vh - 4rem )
  background: #303030
  z-index: 1
  color: #fff
</style>
