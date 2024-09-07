import request from '@/utils/request'

// 用户模块
export function getUser(userId) {
  return request({
    url: `/user/${userId}`,
    method: 'get'
  });
}

export function getUserList(data) {
  return request({
    url: `/user/page`,
    method: 'post',
    data: {
      pageNo: data.pageNo || 1,
      pageSize: data.pageSize || 10,
      condition: {
        title: data.title || '',
        categoryCode: data.categoryCode || '',
        status: data.status || '1'
      }
    }
  });
}

export function updateUser(data) {
  return request({
    url: '/user',
    method: 'put',
    data: {
      userId: data.userId,
      nickName: data.nickName,
      avatar: data.avatar,
      sex: data.sex
    }
  });
}

export function deleteUser(userIds) {
  return request({
    url: `/user/${userIds}`,
    method: 'delete'
  });
}

// 相册模块
export function getAlbum(id) {
  return request({
    url: `/album/${id}`,
    method: 'get'
  });
}
export function getAlbumList(data) {
  return request({
    url: `/album/page`,
    method: 'post',
    data: {
      "pageNo": 0,
      "pageSize": 10,
      "condition": {
        "name": ""
      }
    }
  });
}

export function createAlbum(data) {
  return request({
    url: '/album',
    method: 'post',
    data: {
      name: data.name,
      picNum: data.picNum,
      sortNo: data.sortNo,
      description: data.description
    }
  });
}

export function updateAlbum(data) {
  return request({
    url: '/album',
    method: 'put',
    data: {
      id: data.id,
      name: data.name,
      picNum: data.picNum,
      sortNo: data.sortNo,
      description: data.description
    }
  });
}

export function deleteAlbum(id) {
  return request({
    url: `/album/${id}`,
    method: 'delete'
  });
}

// 用户通用模块
export function generatePhoneCode(phone) {
  return request({
    url: '/user/common/code/phone',
    method: 'post',
    params: { phone }
  });
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
    data: {
      clientId: data.clientId,
      refreshToken: data.refreshToken
    }
  });
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  });
}

// 新闻模块
export function getNewsList(data) {
  return request({
    url: '/news/page',
    method: 'post',
    data: {
      pageNo: data.pageNo || 1,
      pageSize: data.pageSize || 10,
      condition: {
        title: data.title || '',
        categoryCode: data.categoryCode || '',
        status: data.status || '1'
      }
    }
  });
}

export function deleteNews(id) {
  return request({
    url: `/news/${id}`,
    method: 'delete'
  });
}

export function getNews(id) {
  return request({
    url: `/news/${id}`,
    method: 'get'
  });
}

export function updateNews(data) {
  return request({
    url: '/news',
    method: 'put',
    data: {
      id: data.id,
      title: data.title,
      categoryCode: data.categoryCode,
      pictures: data.pictures || [],
      keyWords: data.keyWords || [],
      sortNo: data.sortNo || 0,
      productIds: data.productIds || [],
      status: data.status,
      releaseTime: data.releaseTime,
      newsDetail: data.newsDetail
    }
  });
}

export function createNews(data) {
  return request({
    url: '/news',
    method: 'post',
    data: {
      title: data.title,
      categoryCode: data.categoryCode,
      pictures: data.pictures || [],
      keyWords: data.keyWords || [],
      sortNo: data.sortNo || 0,
      productIds: data.productIds || [],
      status: data.status,
      releaseTime: data.releaseTime,
      newsDetail: data.newsDetail
    }
  });
}

// 分类模块
export function createCategory(data) {
  return request({
    url: '/category',
    method: 'post',
    data: {
      code: data.code,
      name: data.name,
      parentCode: data.parentCode,
      groupCode: data.groupCode,
      sortNo: data.sortNo
    }
  });
}

export function updateCategory(data) {
  return request({
    url: '/category',
    method: 'put',
    data: {
      id: data.id,
      code: data.code,
      name: data.name,
      parentCode: data.parentCode,
      groupCode: data.groupCode,
      sortNo: data.sortNo
    }
  });
}

export function deleteCategory(id) {
  return request({
    url: `/category/${id}`,
    method: 'delete'
  });
}

export function getCategory(id) {
  return request({
    url: `/category/${id}`,
    method: 'get'
  });
}

// 品牌模块
export function createBrand(data) {
  return request({
    url: '/brand',
    method: 'post',
    data: {
      code: data.code,
      name: data.name,
      sortNo: data.sortNo
    }
  });
}

export function updateBrand(data) {
  return request({
    url: '/brand',
    method: 'put',
    data: {
      id: data.id,
      code: data.code,
      name: data.name,
      sortNo: data.sortNo
    }
  });
}

export function deleteBrand(id) {
  return request({
    url: `/brand/${id}`,
    method: 'delete'
  });
}

export function getBrand(id) {
  return request({
    url: `/brand/${id}`,
    method: 'get'
  });
}
export function getBrandList(data) {
  return request({
    url: '/brand/page',
    method: 'post',
    data: {
      pageNo: data.pageNo || 1,
      pageSize: data.pageSize || 10,
      condition: {
        title: data.title || '',
        categoryCode: data.categoryCode || '',
        status: data.status || '1'
      }
    }
  });
}

// 产品模块
export function createProduct(data) {
  return request({
    url: '/product',
    method: 'post',
    data: {
      categoryCode: data.categoryCode,
      brandCode: data.brandCode,
      title: data.title,
      description: data.description,
      keyWords: data.keyWords,
      pictures: data.pictures,
      productDetail: data.productDetail,
      sortNo: data.sortNo,
      releaseTime: data.releaseTime,
      status: '1' // 永远为 '1'
    }
  });
}

export function updateProduct(data) {
  return request({
    url: '/product',
    method: 'put',
    data: {
      id: data.id,
      categoryCode: data.categoryCode,
      brandCode: data.brandCode,
      title: data.title,
      description: data.description,
      keyWords: data.keyWords,
      pictures: data.pictures,
      productDetail: data.productDetail,
      sortNo: data.sortNo,
      releaseTime: data.releaseTime,
      status: '1' // 永远为 '1'
    }
  });
}

export function deleteProduct(id) {
  return request({
    url: `/product/${id}`,
    method: 'delete'
  });
}

export function getProduct(id) {
  return request({
    url: `/product/${id}`,
    method: 'get'
  });
}

export function getProductList(query) {
  return request({
    url: '/product/page',
    method: 'post',
    data: {
      pageNo: query.pageNo,
      pageSize: query.pageSize,
      condition: {
        categoryCode: query.condition.categoryCode,
        brandCode: query.condition.brandCode,
        title: query.condition.title,
        status: query.condition.status || '1' // 默认为 '1'
      }
    }
  });
}
