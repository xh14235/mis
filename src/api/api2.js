import { post } from "./http";
import qs from "qs";

// 登录 获取token
export const login = params => post("/user/login", params);

// 查询已上工产品列表
export const getProductList = params =>
  post("/recordingHours/getProductListByPage", qs.stringify(params));

// 生产上工 目录 状态
export const onWorkState = () => post("/recordingHours/UserWorkStatus");
