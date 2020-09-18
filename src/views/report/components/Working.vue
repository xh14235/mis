<template>
  <div class="page-box working-wrapper">
    <div class="search-wrapper">
      <div class="search-form">
        <div class="form-item">
          <span class="form-label">开始日期：</span>
          <div class="form-input" @click="showCalendar(0)">
            {{ startTime }}
          </div>
        </div>
        <div class="form-item">
          <span class="form-label">结束日期：</span>
          <div class="form-input" @click="showCalendar(1)">
            {{ endTime }}
          </div>
        </div>
        <van-calendar
          v-model="calendarShow"
          :min-date="minDate"
          :show-confirm="false"
          @confirm="onConfirm"
        />
        <!-- <van-calendar
          v-model="endShow"
          :min-date="minDate"
          @confirm="onConfirmEnd"
        /> -->
      </div>
      <div class="search-form">
        <van-radio-group v-model="dateType" @change="changeDateType">
          <van-radio checked-color="#31859B" icon-size="1.4rem" name="1">
            当天
          </van-radio>
          <van-radio checked-color="#31859B" icon-size="1.4rem" name="2">
            本周
          </van-radio>
          <van-radio checked-color="#31859B" icon-size="1.4rem" name="3">
            本月
          </van-radio>
        </van-radio-group>
      </div>
      <div class="search-btn-wrapper">
        <van-button type="default" @click="clearForm()">清除</van-button>
        <van-button color="#31859B" @click="getHourList()">搜索</van-button>
      </div>
    </div>
    <div class="hours-list">
      <div class="table-head">
        <span>序号</span>
        <span>人员</span>
        <span>小计工时</span>
      </div>
      <div class="table-body" v-if="hourList.length">
        <p v-for="(item, index) of hourList" :key="item.staffID">
          <span>{{ index + 1 }}</span>
          <span>{{ item.staffName }}</span>
          <span>{{ item.workingHours }}</span>
        </p>
      </div>
      <div class="no-info" v-else>暂无信息</div>
      <!-- <van-pagination
        v-model="currentPage"
        :total-items="total"
        :items-per-page="10"
        :show-page-size="3"
        force-ellipses
        @change="changePage"
      /> -->
    </div>
    <van-button class="back" color="#A5A5A5" @click="goBack()">返回</van-button>
  </div>
</template>

<script>
import { getHourList, getDateType } from "@/api/api";
export default {
  name: "Working",
  data() {
    return {
      startTime: "",
      endTime: "",
      calendarShow: false,
      startOrEnd: 0,
      dateType: "1",
      hourList: [],
      minDate: new Date(2010, 0, 1)
      // total: 0,
      // currentPage: 1
    };
  },
  methods: {
    getHourList() {
      getHourList({
        startDate: this.startTime,
        endDate: this.endTime
      }).then(res => {
        this.hourList = res.list;
      });
    },
    getDateType(stamp) {
      stamp = new Date(stamp);
      let year = stamp.getFullYear();
      let month = stamp.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let day = stamp.getDate();
      day = day < 10 ? "0" + day : day;
      return year + "-" + month + "-" + day;
    },
    clearForm() {
      this.startTime = "";
      this.endTime = "";
      this.dateType = "0";
    },
    changeDateType(e) {
      let RangeType = "";
      switch (e) {
        case "1":
          RangeType = "01";
          break;
        case "2":
          RangeType = "11";
          break;
        case "3":
          RangeType = "21";
          // this.startTime = day30;
          // this.endTime = today;
          break;
        default:
          break;
      }
      getDateType({ RangeType: RangeType }).then(res => {
        this.startTime = res.list.startDate;
        this.endTime = res.list.endDate;
      });
      // let today = this.getDateType(new Date().getTime());
      // let day7 = this.getDateType(
      //   new Date().getTime() - 24 * 60 * 60 * 1000 * 7
      // );
      // let day30 = this.getDateType(
      //   new Date().getTime() - 24 * 60 * 60 * 1000 * 30
      // );
    },
    // changePage() {
    //   this.getHourList();
    // }
    goBack() {
      this.$router.go(-1);
    },
    showCalendar(num) {
      this.calendarShow = true;
      this.startOrEnd = num;
    },
    onConfirm(e) {
      if (this.startOrEnd === 0) {
        this.startTime = this.getDateType(e.getTime());
      } else {
        this.endTime = this.getDateType(e.getTime());
      }
      this.calendarShow = false;
    }
  },
  mounted() {
    let today = this.getDateType(new Date().getTime());
    this.startTime = today;
    this.endTime = today;
  }
};
</script>

<style lang="stylus" scoped>
.table-head >>> span, .table-body >>> span
  flex: 0 0 33%
  width: 33%
  text-align: center
.working-wrapper >>> .van-pagination__item
  color: #31859B
.working-wrapper >>> .van-pagination__item--active
  color: #ffffff
  background-color: #31859B
.working-wrapper >>> .van-pagination__item
  height: 2.4rem
  min-width: 2.4rem
.working-wrapper >>> .van-button
  height: 3.2rem
  &.back
    margin-top: 1rem
.working-wrapper >>> .van-cell__title
  flex: 0 0 auto
.working-wrapper
  text-align: center
  .search-wrapper
    width: 100%
    margin: 1rem auto
    background: #DBEEF3
    border-radius: 2px
    .search-form
      display: flex
      justify-content: space-between
      flex-wrap: wrap
      padding: 1rem
      border-bottom: 1px dashed #ddd
      .form-item
        flex: 0 0 48%
        width: 48%
        display: flex
        align-items: center
        height: 3rem
        line-height: 3rem
        .form-input
          flex: 1
          width: 100%
          border-radius: 2px
          height: 3rem
          background: #fff
          text-align: left
          padding-left: 1rem
      .van-radio-group
        display: flex
        justify-content: space-around
        width: 100%
        .van-radio
          flex: 0 0 30%
          width: 30%
    .search-btn-wrapper
      display: flex
      justify-content: space-around
      align-items: center
      padding: 1rem
  .hours-list
    border: 1px solid #92CDDC
    border-radius: 2px
    background: #fff
    padding: 1rem
    .no-info
      text-align: center
      padding: .5rem
</style>
