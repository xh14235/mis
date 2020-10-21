import axios from "axios";
// 包装param参数
import qs from "qs";
axios.defaults.baseURL = "http://172.18.101.101:8080";
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
    .post("/recordingHours/selectWaitingList", qs.stringify(params))
    .then(res => res.data);
};
// 生产下工
export const downToWork = params => {
  return axios
    .post("/recordingHours/downToWork", JSON.stringify(params))
    .then(res => res.data);
};
// 获取未完成信息列表
export const getIncompleteList = params => {
  return axios
    .post("/recordingHours/selectWorkStatus", qs.stringify(params))
    .then(res => res.data);
};
// 获取审核列表
export const getExamineList = params => {
  return axios
    .post("/recordingHours/Recordstobereviewed", JSON.stringify(params))
    .then(res => res.data);
};
// 审核
export const toExamine = params => {
  return axios
    .post("/recordingHours/toexamine", JSON.stringify(params))
    .then(res => res.data);
};
// 获取已审核员工列表
export const getAuthorizedList = () => {
  return axios
    .post("/recordingHours/Authoritymanagement")
    .then(res => res.data);
};
// 获取可审核员工列表
export const getBeforeAuthorizedList = () => {
  return axios
    .post("/recordingHours/SelectAddmanageList")
    .then(res => res.data);
};
// 增加或者删除授权
export const updatePermissions = params => {
  return axios
    .post("/recordingHours/Updatepermissions", JSON.stringify(params))
    .then(res => res.data);
};
// 获取工时列表
export const getHourList = params => {
  return axios
    .post("/HoursReport/getHoursReport", qs.stringify(params))
    .then(res => res.data);
};
// 获取最近一天、七天、一个月
export const getDateType = params => {
  return axios
    .post("/HoursReport/getTimeFrame", qs.stringify(params))
    .then(res => res.data);
};
// 手工输入sn
export const handleSn = params => {
  return axios
    .post("/recordingHours/selectRecordingHoursBysn", qs.stringify(params))
    .then(res => res.data);
};
// 文件上传
export const submitFile = params => {
  let config = {
    headers: { "Content-Type": "multipart/form-data" }
  };
  // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  return axios
    .post("/recordingHours/selectRecordingHoursByEWM", params, config)
    .then(res => res.data);
};
