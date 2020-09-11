<template>
  <div class="page-box incomplete-box">
    <div class="productived-title table-title">未完成信息</div>
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
    <van-button color="#A5A5A5" @click="goBack()">返回</van-button>
  </div>
</template>

<script>
import { selectWorkStatus } from "@/api/api";
export default {
  name: "Incomplete",
  data() {
    return {
      productivedList: []
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    selectWorkStatus().then(res => {
      this.productivedList = res.list;
    });
  }
};
</script>

<style lang="stylus" scoped>
.table-body >>> span
  padding: .2rem
.incomplete-box >>> .van-button
  height: 3.2rem
  margin-top: 1rem
.incomplete-box
  text-align: center
  .productived-title
    background: #bbb
  .productived-list
    padding: 1rem
    .no-info
      text-align: center
      padding: 1rem
</style>
