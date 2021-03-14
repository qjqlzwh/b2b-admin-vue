import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-base/notice/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/cow-base/notice/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-base/notice/update',
    method: 'post',
    data: params
  })
}

export function detail(id) {
  return request({
    url: `/cow-base/notice/detail/${id}`,
    method: 'get'
  })
}
