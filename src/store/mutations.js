export default {
  // pc端，改变左侧菜单收缩展开状态
  changeMenuStatus(state) {
    let width = document.body.clientWidth;
    if (width > 768) {
      state.menuStatus = !state.menuStatus;
    }
  },
  // 获取页面宽度，以控制左侧菜单的收缩展开状态
  getPageWidth(state) {
    let width = document.body.clientWidth;
    if (width <= 767) {
      state.menuStatus = true;
    } else {
      state.menuStatus = false;
    }
  },
  // 储存token
  getToken(state, data) {
    state.token = data.token;
    state.userName = data.user;
  },
  // 控制弹出菜单显示隐藏
  toggleNavPopup(state) {
    state.navPopupShow = !state.navPopupShow;
  },
  // 隐藏弹出菜单
  hideNavPopup(state) {
    state.navPopupShow = false;
  }
};
