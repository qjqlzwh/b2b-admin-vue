import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-user/role/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/cow-user/role/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-user/role/update',
    method: 'post',
    data: params
  })
}

export function detail(id) {
  return request({
    url: `/cow-user/role/detail/${id}`,
    method: 'get'
  })
}

export function allRole(params) {
  return request({
    url: '/cow-user/role/allRole',
    method: 'get',
    params
  })
}

