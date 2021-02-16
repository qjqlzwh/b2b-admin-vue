import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-user/customer/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/cow-user/customer/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-user/customer/update',
    method: 'post',
    data: params
  })
}

export function detail(id) {
  return request({
    url: `/cow-user/customer/detail/${id}`,
    method: 'get'
  })
}
