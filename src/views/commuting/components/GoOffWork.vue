<template>
  <div class="page-box go-off-work-box">
    <div class="productived-title table-title">已上工产品</div>
    <div class="productived-list">
      <div class="table-head">
        <span>项目编号</span>
        <span>产品名称</span>
        <span>出厂编号</span>
        <span>设备位数</span>
      </div>
      <div class="table-body" v-if="productivedList.length">
        <p v-for="item of productivedList" :key="item.tag">
          <span>{{ item.projectID }}</span>
          <span>{{ item.projectName }}</span>
          <span>{{ item.sn }}</span>
          <span>{{ item.tag }}</span>
        </p>
      </div>
      <div class="no-info" v-else>暂无信息</div>
    </div>
    <van-button color="#31859B" @click="goOffWork()">下工</van-button>
  </div>
</template>

<script>
import { selectWorkStatus, downToWork } from "@/api/api";
export default {
  name: "GoOffWork",
  data() {
    return {
      productivedList: []
    };
  },
  methods: {
    selectWorkStatus() {
      selectWorkStatus().then(res => {
        if (res.code === 200) {
          this.productivedList = res.list;
        }
      });
    },
    goOffWork() {
      downToWork(this.productivedList).then(res => {
        if (res.code === 200) {
          this.$toast.success(res.msg);
          this.selectWorkStatus();
        } else {
          this.$toast.fail("下工失败！");
        }
      });
    }
  },
  mounted() {
    this.selectWorkStatus();
  }
};
</script>

<style lang="stylus" scoped>
.table-body >>> span
  padding: .2rem
.go-off-work-box >>> .van-button
  height: 3.2rem
  margin-top: 1rem
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
</style>
