<template>
  <div class="page-box go-to-work-box">
    <div class="search-wrapper">
      <div class="search-tab">
        <div
          class="search-tab-item"
          :class="{ active: tabChosen === index }"
          v-for="(item, index) of tabList"
          :key="item.id"
          @click="changeTab(index)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="search-form">
        <div class="form-item">
          <span class="form-label">搜索数量</span>
          <input v-model="form.SelQty" class="form-input" type="text" />
        </div>
        <div class="form-item">
          <span class="form-label">项目编号</span>
          <input v-model="form.ProjectID" class="form-input" type="text" />
        </div>
        <div class="form-item">
          <span class="form-label">产品名</span>
          <input v-model="form.PrdName" class="form-input" type="text" />
        </div>
        <div class="form-item form-item2">
          <span class="form-label">出厂编号</span>
          <input v-model="form.SN" class="form-input" type="text" />
        </div>
        <div class="form-item form-item2">
          <span class="form-label">设备位号</span>
          <input v-model="form.Tag" class="form-input" type="text" />
        </div>
      </div>
      <div class="search-btn-wrapper">
        <van-button type="default" @click="clearForm()">清除</van-button>
        <van-button color="#31859B" @click="getProductList()">搜索</van-button>
      </div>
    </div>
    <div class="product-list">
      <div class="table-head">
        <span>项目编号</span>
        <span>产品名称</span>
        <span>出厂编号</span>
        <span>设备位数</span>
        <span>操作</span>
      </div>
      <div class="table-body" v-if="productList.length">
        <p v-for="item of productList" :key="item.tag">
          <span>{{ item.projectID }}</span>
          <span>{{ item.projectName }}</span>
          <span>{{ item.sn }}</span>
          <span>{{ item.tag }}</span>
          <span>
            <div @click="addProduct(item)">添加</div>
          </span>
        </p>
      </div>
      <div class="no-info" v-else>暂无信息</div>
      <van-pagination
        v-model="currentPage"
        :total-items="total"
        :items-per-page="form.size"
        :show-page-size="3"
        force-ellipses
        @change="changePage"
      />
    </div>
    <div class="unproductive-title table-title">待上工产品</div>
    <div class="unproductive-list">
      <div class="table-head">
        <span>项目编号</span>
        <span>产品名称</span>
        <span>出厂编号</span>
        <span>设备位数</span>
        <span>操作</span>
      </div>
      <div class="table-body" v-if="unproductiveList.length">
        <p v-for="item of unproductiveList" :key="item.tag">
          <span>{{ item.projectID }}</span>
          <span>{{ item.projectName }}</span>
          <span>{{ item.sn }}</span>
          <span>{{ item.tag }}</span>
          <span>
            <div @click="deleteProduct(item)">删除</div>
          </span>
        </p>
      </div>
      <div class="no-info" v-else>暂无信息</div>
    </div>
    <van-button class="to-work" color="#31859B" @click="addDetail()">
      上工
    </van-button>
  </div>
</template>

<script>
import { getProductList, addDetail } from "@/api/api";
export default {
  name: "GoToWork",
  data() {
    return {
      tabChosen: 0,
      tabList: [
        {
          id: "01",
          name: "条件搜索"
        },
        {
          id: "02",
          name: "出产编号"
        },
        {
          id: "03",
          name: "设备位号"
        }
      ],
      form: {
        ProjectID: "", // 项目编号
        SelQty: 100, // 数量，
        PrdName: "", // 产品名
        SN: "", // 出厂编号
        Tag: "", // 设备位号
        Remarks: "", //备注
        page: 1,
        size: 10
      },
      productList: [],
      total: 0,
      unproductiveList: [],
      currentPage: 1
    };
  },
  methods: {
    changeTab(index) {
      this.tabChosen = index;
    },
    getProductList() {
      getProductList(this.form).then(res => {
        if (res.code === 200) {
          this.productList = res.list;
          this.total = res.total;
        }
      });
    },
    changePage(e) {
      this.getProductList(e);
    },
    clearForm() {
      this.form = {
        ProjectID: "", // 项目编号
        SelQty: 100, // 数量，
        PrdName: "", // 产品名
        SN: "", // 出厂编号
        Tag: "", // 设备位号
        Remarks: "", //备注
        page: 1,
        size: 10
      };
    },
    addProduct(item) {
      this.unproductiveList.push(item);
    },
    deleteProduct(item) {
      this.unproductiveList = this.unproductiveList.filter(
        o => o.prdID != item.prdID
      );
    },
    addDetail() {
      addDetail(this.unproductiveList).then(res => {
        if (res.code === 200) {
          this.$toast.success(res.msg);
        } else {
          this.$toast.fail("开工失败！");
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.go-to-work-box >>> .van-pagination__item
  color: #31859B
.go-to-work-box >>> .van-pagination__item--active
  color: #ffffff
  background-color: #31859B
.go-to-work-box >>> .van-button
  height: 3.2rem
.table-body >>> span
  padding: .2rem
.table-body >>> div
  padding: .2rem
  white-space: nowrap
  background: #258dde
  border-radius: 2px
  color: #fff
.go-to-work-box >>> .van-pagination__item
  height: 2.4rem
  min-width: 2.4rem
.go-to-work-box >>> .form-input
  height: 2.4rem
.go-to-work-box
  text-align: center
  .search-wrapper
    width: 100%
    margin: 1rem auto
    background: #DBEEF3
    border-radius: 2px
    .search-tab
      display: flex
      justify-content: space-between
      .search-tab-item
        flex: 0 0 33%
        width: 33%
        text-align: center
        line-height: 3rem
        background: #D8D8D8
        border-radius: 2px
        font-size: 1.4rem
        &.active
          background: #92CDDC
    .search-form
      display: flex
      justify-content: space-between
      flex-wrap: wrap
      padding: 1rem
      border-bottom: 1px dashed #ddd
      .form-item
        flex: 0 0 30%
        width: 30%
        display: flex
        align-items: center
        height: 3rem
        line-height: 3rem
        .form-input
          flex: 1
          width: 100%
          border-radius: 2px
          border: 1px solid #ddd
        &.form-item2
          flex: 0 0 48%
          width: 48%
    .search-btn-wrapper
      display: flex
      justify-content: space-around
      align-items: center
      padding: 1rem
  .product-list
    border: 1px solid #92CDDC
    border-radius: 2px
    background: #fff
    padding: 1rem
    .no-info
      text-align: center
      padding: .5rem
  .unproductive-title
    background: #FBD7BB
  .unproductive-list
    padding: 1rem
    background: #FDF2EA
    .no-info
      text-align: center
      padding: 1rem
  .to-work
    margin-top: 1rem
</style>
