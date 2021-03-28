import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-interface/task-config/list',
    method: 'get',
    params
  })
}

export function save(params) {
  return request({
    url: '/cow-interface/task-config/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-interface/task-config/update',
    method: 'post',
    data: params
  })
}

export function detail(id) {
  return request({
    url: `/cow-interface/task-config/detail/${id}`,
    method: 'get'
  })
}
