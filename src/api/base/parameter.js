import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-base/parameter/list',
    method: 'get',
    params
  })
}
