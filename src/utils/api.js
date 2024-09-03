import request from '@/utils/request'

// 用户模块
export function getUser(userId) {
  return request({
    url: `/user/${userId}`,
    method: 'get'
  })
}

export function updateUser(data) {
  return request({
    url: '/user',
    method: 'put',
    data
  })
}

export function deleteUser(userIds) {
  return request({
    url: `/user/${userIds}`,
    method: 'delete'
  })
}

// 相册模块
export function getAlbum(id) {
  return request({
    url: `/album/${id}`,
    method: 'get'
  })
}

export function createAlbum(data) {
  return request({
    url: '/album',
    method: 'post',
    data
  })
}

export function updateAlbum(data) {
  return request({
    url: '/album',
    method: 'put',
    data
  })
}

export function deleteAlbum(id) {
  return request({
    url: `/album/${id}`,
    method: 'delete'
  })
}

// 用户通用模块
export function generatePhoneCode(phone) {
  return request({
    url: '/user/common/code/phone',
    method: 'post',
    params: { phone }
  })
}

// 登录认证模块
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function refreshToken(data) {
  return request({
    url: '/auth/token/refresh',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

// 新闻模块
export function createNews(data) {
  return request({
    url: '/news',
    method: 'post',
    data
  })
}

export function updateNews(data) {
  return request({
    url: '/news',
    method: 'put',
    data
  })
}

export function deleteNews(id) {
  return request({
    url: `/news/${id}`,
    method: 'delete'
  })
}

export function getNews(id) {
  return request({
    url: `/news/${id}`,
    method: 'get'
  })
}

// 分类模块
export function createCategory(data) {
  return request({
    url: '/category',
    method: 'post',
    data
  })
}

export function updateCategory(data) {
  return request({
    url: '/category',
    method: 'put',
    data
  })
}

export function deleteCategory(id) {
  return request({
    url: `/category/${id}`,
    method: 'delete'
  })
}

export function getCategory(id) {
  return request({
    url: `/category/${id}`,
    method: 'get'
  })
}

// 品牌模块
export function createBrand(data) {
  return request({
    url: '/brand',
    method: 'post',
    data
  })
}

export function updateBrand(data) {
  return request({
    url: '/brand',
    method: 'put',
    data
  })
}

export function deleteBrand(id) {
  return request({
    url: `/brand/${id}`,
    method: 'delete'
  })
}

export function getBrand(id) {
  return request({
    url: `/brand/${id}`,
    method: 'get'
  })
}

// 产品模块
export function createProduct(data) {
  return request({
    url: '/product',
    method: 'post',
    data
  })
}

export function updateProduct(data) {
  return request({
    url: '/product',
    method: 'put',
    data
  })
}

export function deleteProduct(id) {
  return request({
    url: `/product/${id}`,
    method: 'delete'
  })
}

export function getProduct(id) {
  return request({
    url: `/product/${id}`,
    method: 'get'
  })
}
