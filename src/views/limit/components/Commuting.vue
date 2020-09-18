<template>
  <div class="page-box commuting-wrapper">
    <div class="authorized-title table-title">已授权审核员工</div>
    <div class="authorized-list">
      <div class="table-head">
        <span>选中</span>
        <span>员工姓名</span>
        <span>删除审核关系</span>
      </div>
      <div class="table-body" v-if="authorizedList.length">
        <p v-for="item of authorizedList" :key="item.beChkedStaffName">
          <span>
            <van-checkbox
              checked-color="#FF6C6C"
              v-model="item.active"
            ></van-checkbox>
          </span>
          <span>{{ item.beChkedStaffName }}</span>
          <span>
            <div
              class="authorized-btn"
              @click="updatePermissions([item], '-1')"
            >
              删除
            </div>
          </span>
        </p>
      </div>
      <div class="no-info" v-else>暂无信息</div>
    </div>
    <van-button
      color="#FF6C6C"
      @click="updatePermissions(authorizedList, '-1')"
    >
      删除选中
    </van-button>

    <div class="authorized2-title table-title">可授权审核员工</div>
    <div class="authorized2-list">
      <div class="table-head">
        <span>选中</span>
        <span>员工姓名</span>
        <span>增加审核关系</span>
      </div>
      <div class="table-body" v-if="beforeAuthorizedList.length">
        <p v-for="item of beforeAuthorizedList" :key="item.tag">
          <span>
            <van-checkbox
              checked-color="#789440"
              v-model="item.active"
            ></van-checkbox>
          </span>
          <span>{{ item.beChkedStaffName }}</span>
          <span>
            <div
              class="authorized2-btn"
              @click="updatePermissions([item], '1')"
            >
              增加
            </div>
          </span>
        </p>
      </div>
      <div class="no-info" v-else>暂无信息</div>
    </div>
    <van-button
      color="#789440"
      @click="updatePermissions(beforeAuthorizedList, '1')"
    >
      增加选中
    </van-button>
  </div>
</template>

<script>
import {
  getAuthorizedList,
  getBeforeAuthorizedList,
  updatePermissions
} from "@/api/api";
export default {
  name: "Commuting",
  data() {
    return {
      authorizedList: [],
      beforeAuthorizedList: []
    };
  },
  methods: {
    getAuthorizedList() {
      getAuthorizedList().then(res => {
        if (res.code === 200) {
          this.authorizedList = res.list.map(item => {
            item.active = false;
            return item;
          });
        }
      });
    },
    getBeforeAuthorizedList() {
      getBeforeAuthorizedList().then(res => {
        if (res.code === 200) {
          this.beforeAuthorizedList = res.list.map(item => {
            item.active = false;
            return item;
          });
        }
      });
    },
    updatePermissions(list, updateType) {
      let list2 = [];
      if (list.length > 1) {
        list2 = list.filter(item => {
          return item.active === true;
        });
      } else {
        list2 = list;
      }
      let list3 = list2.map(item => {
        let item2 = {};
        item2.updateType = updateType;
        item2.beChkedStaffID = item.beChkedStaffID;
        return item2;
      });
      updatePermissions(list3).then(res => {
        if (res.code === 200) {
          this.getAuthorizedList();
          this.getBeforeAuthorizedList();
        }
      });
    }
  },
  mounted() {
    this.getAuthorizedList();
    this.getBeforeAuthorizedList();
  }
};
</script>

<style lang="stylus" scoped>
.table-head >>> span
  flex: 0 0 33%
  width: 33%
.table-body >>> span
  flex: 0 0 33%
  width: 33%
  text-align: center
.table-body >>> .authorized2-btn, .table-body >>> .authorized-btn
  display: inline-block
  padding: .2rem 0.5rem
  white-space: nowrap
  border-radius: 2px
  color: #fff
.table-body >>> .authorized-btn
  background: #FF6C6C
.table-body >>> .authorized2-btn
  background: #789440
.table-body >>> .van-checkbox__icon
  margin: 0 auto
.commuting-wrapper >>> .van-button
  height: 3.2rem
  margin-top: 1rem
.commuting-wrapper >>> .no-info
  text-align: center
  padding: 1rem
.commuting-wrapper >>> .van-button
  height: 3.2rem
.commuting-wrapper >>> .van-cell__title
  flex: 0 0 auto
.commuting-wrapper
  text-align: center
  .authorized-title
    background: #FF6C6C
  .authorized2-title
    background: #789440
  .authorized-list, .authorized2-list
    background: #fff
    padding: 1rem
</style>
