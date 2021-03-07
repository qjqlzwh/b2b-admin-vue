import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-base/parameter/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/cow-base/parameter/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-base/parameter/update',
    method: 'post',
    data: params
  })
}

export function detail(id) {
  return request({
    url: `/cow-base/parameter/detail/${id}`,
    method: 'get'
  })
}
