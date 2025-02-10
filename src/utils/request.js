import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import router from "@/router"; // 导入 Vue Router 实例
import { getToken } from "@/utils/auth";

// 创建 axios 实例
const service = axios.create({
  baseURL: "https://api.cnnjqc.com",

  timeout: 10000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 获取 token
    // const token = localStorage.getItem('accessToken') || store.getters.token;
    const token = getToken();
    console.log("Token in request interceptor:", token); // 检查每次请求时的 token

    if (token) {
      // 如果存在 token，则将其添加到请求头
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    console.log("API response:", res);

    // 如果 code 严格不为 '0'，才视为错误
    if (res.code && res.code !== "0") {
      Message({
        message: res.msg || "Error",
        type: "error",
        duration: 5 * 1000,
      });

      // 特殊错误码处理
      if (["110002", "401", "50008", "50012", "50014"].includes(res.code)) {
        MessageBox.confirm("您尚未登录或登录已过期，请重新登录！", "登录过期", {
          confirmButtonText: "重新登录",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          store.dispatch("user/resetToken").then(() => {
            router.push("/login");
          });
        });
      }
      return Promise.reject(new Error(res.msg || "Error"));
    }

    return res; // 直接返回响应数据
  },
  (error) => {
    console.log("err" + error);
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });

    if (error.response && error.response.status === 401) {
      MessageBox.alert("您尚未登录或登录已过期，请重新登录！", "登录过期", {
        confirmButtonText: "确定",
        callback: () => {
          store.dispatch("user/resetToken").then(() => {
            router.push("/login");
          });
        },
      });
    }

    return Promise.reject(error);
  }
);

export default service;
