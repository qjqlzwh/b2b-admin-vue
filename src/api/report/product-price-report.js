import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/cow-report/productPriceReport/list',
    method: 'get',
    params
  })
}
