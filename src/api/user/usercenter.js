import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-user/user/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/cow-user/user/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-user/user/update',
    method: 'post',
    data: params
  })
}

export function detail(id) {
  return request({
    url: `/cow-user/user/detail/${id}`,
    method: 'get'
  })
}
