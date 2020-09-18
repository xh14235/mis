<template>
  <div class="page-wrapper">
    <CommonHeader></CommonHeader>
    <Crumb></Crumb>
    <div class="nav-box page-box">
      <div class="nav1" v-for="item1 of navList" :key="item1.id">
        <div class="nav1-left">
          <img :src="item1.icon" alt />
        </div>
        <div class="nav1-right">
          <div class="nav2" v-for="item2 of item1.children" :key="item2.id">
            <div class="nav2-name">{{ item2.name }}</div>
            <ul class="nav2-ul">
              <li
                class="nav2-li"
                :class="{ grey: item3.status }"
                v-for="(item3, index) of item2.children"
                :key="item3.id"
                @click="changeRouter(item3.route, item3.status)"
              >
                {{ item3.name }}
                <span class="working" v-if="item3.status && index === 0">
                  （上工中）
                </span>
                <!-- <span class="working" v-if="item3.status && index === 1">
                  （下工中）
                </span> -->
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <CommonFooter></CommonFooter>
  </div>
</template>

<script>
import { onWorkState } from "@/api/api";
import nav1 from "@/assets/img/nav1.png";
import nav2 from "@/assets/img/nav2.png";
import nav3 from "@/assets/img/nav3.png";
export default {
  name: "Nav",
  components: {
    CommonHeader: () => import("@/components/CommonHeader"),
    Crumb: () => import("@/components/Crumb"),
    CommonFooter: () => import("@/components/CommonFooter")
  },
  data() {
    return {
      navList: [
        {
          id: "1",
          icon: nav1,
          children: [
            {
              id: "11",
              name: "上下工管理",
              children: [
                {
                  id: "111",
                  name: "生产上工",
                  route: "/commuting/gotowork",
                  status: 0
                },
                {
                  id: "112",
                  name: "生产下工",
                  route: "/commuting/gooffwork",
                  status: 0
                },
                {
                  id: "113",
                  name: "未完成信息",
                  route: "/commuting/incomplete"
                }
              ]
            },
            {
              id: "12",
              name: "生产审核",
              children: [
                {
                  id: "121",
                  name: "上下工审核",
                  route: "/audit/commuting",
                  status: 0
                }
              ]
            }
          ]
        },
        {
          id: "2",
          icon: nav2,
          children: [
            {
              id: "21",
              name: "查询/报表",
              children: [
                {
                  id: "211",
                  name: "工时报表",
                  route: "/report/working"
                }
              ]
            }
          ]
        },
        {
          id: "3",
          icon: nav3,
          children: [
            {
              id: "31",
              name: "权限设置",
              children: [
                {
                  id: "311",
                  name: "上下工审核",
                  route: "/limit/commuting"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    changeRouter(route, status) {
      if (status) {
        return false;
      } else {
        this.$router.push({ path: route });
      }
    }
  },
  mounted() {
    onWorkState().then(res => {
      this.navList[0].children[0].children[0].status = Number(res.code);
      this.navList[0].children[0].children[1].status = !Number(res.code);
    });
  }
};
</script>

<style lang="stylus" scoped>
.nav1
  width: 100%
  padding: 2rem 0
  border-bottom: 1px dashed #D8D8D8
  display: flex
  align-items: flex-start
  .nav1-left
    flex: 0 0 25%
    width: 25%
    text-align: center
    padding-top: 0.5rem
  .nav1-right
    flex: 0 0 75%
    width: 75%
    min-height: 10vh
    padding-left: 2rem
    border-left: 1px solid #d8d8d8
    .nav2
      font-size: 1.4rem
      color: #258dde
      .nav2-ul
        .nav2-li
          padding-left: 3rem
          line-height: 3rem
          .working
            color: #F9C499
          &.grey
            color: grey
</style>
