import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-interface/task-info-log/list',
    method: 'get',
    params
  })
}
