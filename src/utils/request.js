import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';

// create an axios instance
const service = axios.create({
  baseURL: 'https://cms.fhmuseum.cn', // your base URL
  timeout: 5000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken') || store.getters.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Include the token in the header
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;

    // Log the response to check the structure
    console.log('API response:', res);

    // Modify the condition to check if the code is string '0'
    if (res.code !== '0') {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });

      // Handle token-related errors
      if (res.code === '401' || res.code === '50008' || res.code === '50012' || res.code === '50014') {
        MessageBox.confirm(
          'You have been logged out, you can cancel to stay on this page, or log in again',
          'Confirm logout',
          {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
        ).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.msg || 'Error'));
    } else {
      return res;
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);


export default service;
