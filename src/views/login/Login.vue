<template>
  <div class="page-wrapper">
    <img class="login-logo" src="../../assets/img/logo.png" alt />
    <div class="login-title">Regeon MIS</div>
    <div class="login-box">
      <div class="login-box-header">Login</div>
      <van-field
        v-model="account.userName"
        label="用户名"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="account.passWord"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
      <van-checkbox
        class="login-checkbox"
        checked-color="#31859B"
        v-model="checked"
        icon-size="1.4rem"
      >
        记住用户名
      </van-checkbox>
      <div class="login-btn" @click="login">登 录</div>
    </div>
    <CommonFooter></CommonFooter>
  </div>
</template>

<script>
import { login } from "@/api/api";
import { mapMutations } from "vuex";
export default {
  name: "Login",
  components: {
    CommonFooter: () => import("@/components/CommonFooter")
  },
  data() {
    return {
      account: {
        userName: "",
        passWord: ""
      },
      checked: false,
      logining: false,
      rules: {
        userName: [
          {
            required: true,
            message: "请输入账号",
            trigger: "blur"
          }
        ],
        passWord: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["getToken"]),
    login() {
      login(this.account).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.getToken(res);
          localStorage.token = res.token;
          sessionStorage.user = res.staffName;
          if (this.checked) {
            localStorage.user = res.staffName;
          }
          localStorage.checked = this.checked;
          this.$router.push({
            path: "/nav"
          });
        } else {
          this.$toast.fail(res.msg);
        }
      });
    }
  },
  created() {
    this.account.userName = localStorage.user || "";
    this.account.passWord = sessionStorage.psw || "";
    this.checked = localStorage.checked === "true" ? true : false;
  }
};
</script>

<style lang="stylus" scoped>
.page-wrapper
  padding: 3rem
  .login-logo
    height: 3rem
  .login-title
    text-align: center
    font-size: 2.4rem
    font-weight: 600
    color: #31859B
    margin: 5rem 0 3rem 0
  .login-box
    background: #ffffff
    border-radius: 1rem
    padding-bottom: 3rem
    .login-box-header
      line-height: 4rem
      background: #BFBFBF
      border-top-left-radius: 1rem
      border-top-right-radius: 1rem
      text-align: center
      color: #fff
      font-size: 1.6rem
      margin-bottom: 3rem
    .login-checkbox
      justify-content: center
      margin: 3rem 0
      font-size: 1.4rem
    .login-btn
      width: 40%
      line-height: 3rem
      background: #31859B
      border-radius: .5rem
      color: #ffffff
      text-align: center
      margin: 0 auto
      font-size: 1.6rem
</style>
