import axios from "axios";
// 包装param参数
import qs from "qs";
axios.defaults.baseURL = "http://172.18.102.13:8080";
axios.defaults.withCredentials = true;

// 登录
export const login = params => {
  return axios.post("/user/login", qs.stringify(params)).then(res => res.data);
};
// 获取上工页面产品列表
export const getProductList = params => {
  return axios
    .post("/recordingHours/getProductListByPage", qs.stringify(params))
    .then(res => res.data);
};
// 生产上工 目录 状态
export const onWorkState = () => {
  return axios.post("/recordingHours/UserWorkStatus").then(res => res.data);
};
// 生产上工 加入上工列表
export const addDetail = params => {
  return axios
    .post("/recordingHours/start", JSON.stringify(params))
    .then(res => res.data);
};
// 查询已上工产品列表
export const selectWorkStatus = params => {
  return axios
    .post("/recordingHours/selectWorkStatus", qs.stringify(params))
    .then(res => res.data);
};
// 生产下工
export const downToWork = params => {
  return axios
    .post("/recordingHours/downToWork", JSON.stringify(params))
    .then(res => res.data);
};
