<template>
  <div class="page-box go-off-work-box">
    <div class="productived-title table-title">已上工产品</div>
    <div class="productived-list">
      <div class="table-head">
        <span>项目编号</span>
        <span>产品名称</span>
        <span>出厂编号</span>
        <span>设备位号</span>
        <span>上工时间</span>
      </div>
      <div class="table-body" v-if="productivedList.length">
        <p v-for="item of productivedList" :key="item.prdID">
          <span>{{ item.projectID }}</span>
          <span>{{ item.prdName }}</span>
          <span>{{ item.sn }}</span>
          <span>{{ item.tag }}</span>
          <span>{{ item.startTime }}</span>
          <!-- <span>
            <p>{{ item.startTime }}</p>
            <div class="xiagong-btn" @click="goOffWork([item])">下工</div>
          </span> -->
        </p>
      </div>
      <div class="no-info" v-else>暂无信息</div>
    </div>
    <van-button
      class="to-work"
      :class="{ workable: toWorkDisable }"
      color="#aaa"
      @click="goOffWork(productivedList)"
    >
      全部下工
    </van-button>
  </div>
</template>

<script>
import { selectWorkStatus } from "@/api/api";
import { downToWork } from "@/api/api";
export default {
  name: "GoOffWork",
  data() {
    return {
      productivedList: []
    };
  },
  computed: {
    toWorkDisable() {
      return this.productivedList.length;
    }
  },
  methods: {
    selectWorkStatus() {
      selectWorkStatus().then(res => {
        if (res.code === 200) {
          this.productivedList = res.list;
        }
      });
    },
    goOffWork(list) {
      if (list.length) {
        downToWork(list).then(res => {
          if (res.code === 200) {
            this.$toast.success(res.msg);
            this.selectWorkStatus();
          } else {
            this.$toast.fail("下工失败！");
          }
        });
      } else {
        this.$toast.fail("下工列表为空！");
        return false;
      }
    }
  },
  mounted() {
    this.selectWorkStatus();
  }
};
</script>

<style lang="stylus" scoped>
.table-head >>> span
  flex: 0 0 18%
  width: 18%
  &:nth-child(5)
    flex: 0 0 28%
    width: 28%
.table-body >>> span
  flex: 0 0 18%
  width: 18%
  &:nth-child(2)
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
  &:nth-child(3), &:nth-child(4)
    word-break: break-all
  &:nth-child(5)
    flex: 0 0 28%
    width: 28%
.go-off-work-box >>> .van-button
  height: 3.2rem
.table-body >>> .xiagong-btn
  display: inline-block
  padding: .2rem 0.5rem
  white-space: nowrap
  border-radius: 2px
  color: #fff
.table-body >>> .xiagong-btn
  background: #31859B
.go-off-work-box
  text-align: center
  .productived-title
    background: #FF976A
  .productived-list
    padding: 1rem
    background: #FDF2EA
    .no-info
      text-align: center
      padding: 1rem
  .to-work
    margin-top: 1rem
    &.workable
      background: #FF976A!important
      border-color: #FF976A!important
</style>
