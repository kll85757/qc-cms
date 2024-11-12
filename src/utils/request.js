import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import router from '@/router'; // 导入 Vue Router 实例


// 创建 axios 实例
const service = axios.create({
  baseURL: 'https://cms.fhmuseum.cn', // 设置你的 API 基础 URL
  timeout: 9999999999999999999, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 获取 token
    const token = localStorage.getItem('accessToken') || store.getters.token;
    if (token) {
      // 如果存在 token，则将其添加到请求头
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;

    // 日志打印，查看响应内容
    console.log('API response:', res);

    // 如果返回的状态码不是 '0'，则认为是错误
    if (res.code !== '0') {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });

      // 处理 401 未授权或其他相关错误
      if (res.code === '110002' || res.code === '401' || res.code === '50008' || res.code === '50012' || res.code === '50014') {
        MessageBox.confirm(
          '您尚未登录或登录已过期，请重新登录！',
          '登录过期',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
          }
        ).then(() => {
          // 触发登出操作，清除 token 并重定向到登录页面
          store.dispatch('user/resetToken').then(() => {
            window.location.href = '/login'; // 跳转到登录页面
          });
        });
      }
      return Promise.reject(new Error(res.msg || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    // 处理其他错误
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });

    // 如果是 401 错误，直接跳转到登录页面
    if (error.response && error.response.status === 401) {
      MessageBox.alert('您尚未登录或登录已过期，请重新登录！', '登录过期', {
        confirmButtonText: '确定',
        callback: () => {
          store.dispatch('user/resetToken').then(() => {
            // window.location.href = '/login'; // 跳转到登录页面
            router.push('/login'); // 使用 Vue Router 进行页面跳转


          });
        },
      });
    }

    return Promise.reject(error);
  }
);

export default service;
