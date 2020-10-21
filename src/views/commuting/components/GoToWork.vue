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
      <div class="search-form" v-show="tabChosen === 0">
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
      <div class="search-btn-wrapper" v-show="tabChosen === 0">
        <van-button type="default" @click="clearForm()">清除</van-button>
        <van-button color="#31859B" @click="getProductList()">搜索</van-button>
      </div>
      <div class="sn-wrapper" v-show="tabChosen === 1">
        <div class="scan-code-btn">
          <!-- <input type="file" id="newfile" @change="afterRead" /> -->
          <van-uploader :after-read="afterRead">
            <img src="../../../assets/img/scan-code.png" alt="" />
          </van-uploader>
        </div>
        <div class="sn-input-wrapper">
          <input
            class="sn-input"
            type="text"
            v-model="handleSnNum"
            placeholder="手工输入"
          />
          <van-button
            class="sn-btn"
            :class="{ active: handleSnNum.length }"
            color="#aaaaaa"
            @click="handleSn()"
          >
            提交
          </van-button>
        </div>
      </div>
    </div>
    <div class="product-list">
      <div class="table-head">
        <span>项目编号</span>
        <span>产品名称</span>
        <span>出厂编号</span>
        <span>设备位号</span>
        <span>
          <div class="all-add" @click="addAllProduct()">全部添加</div>
        </span>
      </div>
      <div class="table-body" v-if="productList.length">
        <p v-for="item of productList" :key="item.prdID">
          <span>{{ item.projectID }}</span>
          <span :title="item.prdName">{{ item.prdName }}</span>
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
        <span>设备位号</span>
        <span>操作</span>
      </div>
      <div class="table-body" v-if="unproductiveList.length">
        <p v-for="item of unproductiveList" :key="item.prdID">
          <span>{{ item.projectID }}</span>
          <span :title="item.prdName">{{ item.prdName }}</span>
          <span>{{ item.sn }}</span>
          <span>{{ item.tag }}</span>
          <span>
            <div @click="deleteProduct(item)">删除</div>
          </span>
        </p>
      </div>
      <div class="no-info" v-else>暂无信息</div>
    </div>
    <van-button
      class="to-work"
      :class="{ workable: toWorkDisable }"
      color="#aaa"
      @click="addDetail()"
    >
      上工
    </van-button>
  </div>
</template>

<script>
import { getProductList } from "@/api/api2";
import { addDetail, handleSn, submitFile } from "@/api/api";
export default {
  name: "GoToWork",
  data() {
    return {
      handleSnNum: "",
      tabChosen: 0,
      tabList: [
        {
          id: "01",
          name: "条件搜索"
        },
        {
          id: "02",
          name: "出产编号"
        }
      ],
      form: {
        ProjectID: "", // 项目编号
        SelQty: 100, // 数量
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
  computed: {
    toWorkDisable() {
      return this.unproductiveList.length;
    }
  },
  methods: {
    changeTab(index) {
      this.tabChosen = index;
    },
    getProductList() {
      getProductList(this.form)
        .then(res => {
          if (res.code === 200) {
            this.productList = [];
            this.productList = res.list;
            this.total = res.total;
            if (!res.list.length) {
              this.$toast.fail("查询结果为空！");
            }
          }
        })
        .catch(res => {
          console.log(res);
        });
    },
    changePage() {
      this.form.page = this.currentPage;
      this.getProductList();
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
      if (!this.unproductiveList.length) {
        this.unproductiveList.push(item);
      } else {
        for (let i = 0; i < this.unproductiveList.length; i++) {
          if (this.unproductiveList[i].prdID === item.prdID) {
            this.$toast.fail(item.prdName + item.prdID + "已添加！");
          } else {
            this.unproductiveList.push(item);
          }
        }
      }
    },
    addAllProduct() {
      for (let i = 0; i < this.productList.length; i++) {
        this.addProduct(this.productList[i]);
      }
    },
    deleteProduct(item) {
      this.unproductiveList = this.unproductiveList.filter(
        o => o.prdID != item.prdID
      );
    },
    addDetail() {
      if (this.unproductiveList.length) {
        addDetail(this.unproductiveList).then(res => {
          if (res.code === 200) {
            this.$toast.success(res.msg);
            this.$router.push({
              path: "/nav"
            });
          } else {
            this.$toast.fail("开工失败！");
          }
        });
      } else {
        this.$toast.fail("开工列表为空！");
        return false;
      }
    },
    handleSn() {
      if (this.handleSnNum.length) {
        handleSn({ SN: this.handleSnNum }).then(res => {
          if (res.code === 200 && res.list) {
            let item = res.list;
            this.addProduct(item);
          } else {
            this.$toast.fail("未查询出该产品！");
          }
        });
      }
    },
    // 二维码
    afterRead(file) {
      let param = new FormData();
      param.append("fileUpload", file.file);
      // console.log(param);
      submitFile(param).then(res => {
        // console.log(res);
        if (res.code === 200 && res.list) {
          this.handleSnNum = res.list.sn;
          this.addProduct(res.list);
        } else {
          this.$toast.fail("未识别出该产品！");
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
.table-head >>> span
  flex: 0 0 20%
  width: 20%
  .all-add
    display: inline-block
    padding: 0 0.5rem
    white-space: nowrap
    background: #52bf2e
    border-radius: 2px
    color: #fff
.table-body >>> span
  flex: 0 0 20%
  width: 20%
  &:nth-child(2)
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
  &:nth-child(3), &:nth-child(4)
    word-break: break-all
.table-body >>> div
  display: inline-block
  padding: .2rem 0.5rem
  white-space: nowrap
  background: #31859B
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
        flex: 0 0 50%
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
    .sn-wrapper
      padding: 1rem
      .scan-code-btn
        width: 50%
        margin: 0 auto
        img
          width: 100%
      .sn-input-wrapper
        margin-top: 1rem
        .sn-input
          border-radius: 2px
          border: 1px solid #ddd
          height: 2.4rem
        .sn-btn
          &.active
            background: #31859b!important
            border-color: #31859b!important
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
    &.workable
      background: #31859b!important
      border-color: #31859b!important
</style>
