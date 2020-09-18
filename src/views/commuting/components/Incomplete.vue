<template>
  <div class="page-box incomplete-box">
    <div class="productived-title table-title">未完成信息</div>
    <div class="productived-list">
      <div class="table-head">
        <span>项目编号</span>
        <span>产品名称</span>
        <span>出厂编号</span>
        <span>设备位号</span>
        <span>上工/下工时间</span>
      </div>
      <div class="table-body" v-if="productivedList.length">
        <p v-for="item of productivedList" :key="item.tag">
          <span>{{ item.projectID }}</span>
          <span>{{ item.projectName }}</span>
          <span>{{ item.sn }}</span>
          <span>{{ item.tag }}</span>
          <span>
            <div>{{ item.startTime }}</div>
            <div>{{ item.endTime }}</div>
          </span>
        </p>
      </div>
      <div class="no-info" v-else>暂无信息</div>
    </div>
    <van-button color="#A5A5A5" @click="goBack()">返回</van-button>
  </div>
</template>

<script>
import { getIncompleteList } from "@/api/api";
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
    getIncompleteList().then(res => {
      this.productivedList = res.list;
    });
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
.incomplete-box >>> .van-button
  height: 3.2rem
  margin-top: 1rem
.incomplete-box
  text-align: center
  .productived-title
    background: #bbb
  .productived-list
    padding: 1rem
    background: #fff
    .no-info
      text-align: center
      padding: 1rem
</style>
