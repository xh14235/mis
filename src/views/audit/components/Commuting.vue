<template>
  <div class="page-box commuting-wrapper">
    <div class="commuting-title table-title">未完成信息</div>
    <van-collapse class="accordion-wrapper" v-model="activeNames" accordion>
      <van-collapse-item
        class="accordion-item"
        v-for="(item, index) of usedList"
        :key="index"
        :title="item[0].workStaffName"
        :name="index"
      >
        <van-button
          color="#70578E"
          class="examine-btn"
          @click="toExamine(item)"
        >
          审核
        </van-button>
        <div class="examine-list">
          <div class="table-head">
            <span>项目编号</span>
            <span>产品名称</span>
            <span>出厂编号</span>
            <span>设备位号</span>
          </div>
          <div class="table-body" v-if="item.length">
            <p v-for="item2 of item" :key="item2.tag">
              <span>{{ item2.projectID }}</span>
              <span>{{ item2.projectName }}</span>
              <span>{{ item2.sn }}</span>
              <span>{{ item2.tag }}</span>
            </p>
          </div>
          <div class="no-info" v-else>暂无信息</div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <van-button
      class="all-examine"
      color="#aaa"
      :class="{ workable: toWorkDisable }"
      @click="toExamine(examineList)"
    >
      全部审核
    </van-button>
  </div>
</template>

<script>
import { getExamineList, toExamine } from "@/api/api";
export default {
  name: "Commuting",
  data() {
    return {
      activeNames: "1",
      examineList: [],
      usedList: []
    };
  },
  computed: {
    toWorkDisable() {
      return this.examineList.length;
    }
  },
  methods: {
    getList() {
      getExamineList().then(res => {
        this.examineList = res.list;
        this.usedList = Object.values(
          this.examineList.reduce((res, item) => {
            res[item.workStaffID]
              ? res[item.workStaffID].push(item)
              : (res[item.workStaffID] = [item]);
            return res;
          }, {})
        );
      });
    },
    toExamine(list) {
      let arr = [];
      for (let i = 0; i < list.length; i++) {
        arr.push({
          tmpTimeRecordID: list[i].tmpTimeRecordID
        });
      }
      if (arr.length) {
        toExamine(arr).then(res => {
          console.log(res);
          if (res.code === 200) {
            this.$toast.success(res.msg);
            this.getList();
          } else {
            this.$toast.fail(res.msg);
          }
        });
      } else {
        this.$toast.fail("审核列表为空！");
        return false;
      }
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="stylus" scoped>
.table-head >>> span
  flex: 0 0 25%
  width: 25%
.table-body >>> span
  flex: 0 0 25%
  width: 25%
  &:nth-child(2)
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
  &:nth-child(3), &:nth-child(4)
    word-break: break-all
.commuting-wrapper >>> .van-button
  height: 3.2rem
.commuting-wrapper >>> .van-cell__title
  flex: 0 0 auto
.commuting-wrapper >>> .van-collapse-item__wrapper
  display: block!important
.commuting-wrapper
  text-align: center
  .commuting-title
    background: #AB9AC0
  .accordion-wrapper
    .accordion-item
      position: relative
      .examine-btn
        position: absolute
        top: 0.5rem
        right: 1.5rem
    .examine-list
      .table-body
        max-height: 20vh
        overflow-y: scroll
  .all-examine
    margin-top: 1rem
    &.workable
      background: #70578E!important
      border-color: #70578E!important
</style>
