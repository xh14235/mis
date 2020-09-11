<template>
  <div class="page-box commuting-wrapper">
    <div class="commuting-title table-title">未完成信息</div>
    <van-collapse class="accordion-wrapper" v-model="activeNames" accordion>
      <van-collapse-item class="accordion-item" title="张刚" name="1">
        <van-button color="#70578E" class="examine-btn">审核</van-button>
        <div class="examine-list">
          <div class="table-head">
            <span>项目编号</span>
            <span>产品名称</span>
            <span>出厂编号</span>
            <span>设备位数</span>
          </div>
          <div class="table-body" v-if="examineList.length">
            <p v-for="item of examineList" :key="item.tag">
              <span>{{ item.projectID }}</span>
              <span>{{ item.projectName }}</span>
              <span>{{ item.sn }}</span>
              <span>{{ item.tag }}</span>
            </p>
          </div>
          <div class="no-info" v-else>暂无信息</div>
        </div>
      </van-collapse-item>
      <van-collapse-item title="黎明" name="2">内容</van-collapse-item>
      <van-collapse-item title="王伟" name="3">内容</van-collapse-item>
    </van-collapse>
    <van-button class="all-examine" color="#70578E">全部审核</van-button>
  </div>
</template>

<script>
export default {
  name: "Commuting",
  data() {
    return {
      activeNames: "1",
      examineList: [
        {
          endTime: "2020-09-11 11:16:03",
          prdID: "1086",
          prdName: "照明配电箱",
          projectID: "N17003",
          projectName: "K2K3小三箱设备（标段II）项目",
          remarks: "",
          sn: "N1700320090",
          startTime: "2020-09-09 13:16:27",
          tag: "3LNKB001CR",
          tmpTimeRecordID: "26"
        },
        {
          endTime: "2020-09-11 11:16:03",
          prdID: "5595",
          prdName: "照明标准箱",
          projectID: "N17003",
          projectName: "K2K3小三箱设备（标段II）项目",
          remarks: "",
          sn: "N1700354394",
          startTime: "2020-09-09 13:51:30",
          tag: "3LERG302CR",
          tmpTimeRecordID: "27"
        }
      ]
    };
  },
  methods: {
    getList() {
      console.log("getLIst");
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="stylus" scoped>
.commuting-wrapper >>> .van-button
  height: 3.2rem
.commuting-wrapper >>> .van-cell__title
  flex: 0 0 auto
.commuting-wrapper
  text-align: center
  .commuting-title
    background: #AB9AC0
  .accordion-wrapper
    .accordion-item
      position: relative
      .examine-btn
        position: absolute
        top: .5rem
        right: 1.5rem
    .examine-list
      .table-body
        max-height: 20vh
        overflow-y: scroll
  .all-examine
    margin-top: 1rem
</style>
