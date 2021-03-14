import request from '@/utils/request'
import qs from 'qs'

export function getList(param) {
  return request({
    url: `/cow-order/order/list?${qs.stringify(param)}`,
    method: 'get'
  })
}

export function save(params) {
  return request({
    url: '/cow-order/order/add',
    method: 'post',
    data: params
  })
}

export function update(params) {
  return request({
    url: '/cow-order/order/update',
    method: 'post',
    data: params
  })
}

export function detail(id) {
  return request({
    url: `/cow-order/order/detail/${id}`,
    method: 'get'
  })
}

export function submit(params) {
  return request({
    url: '/cow-order/order/submit',
    method: 'post',
    data: params
  })
}

export function audit(id) {
  return request({
    url: `/cow-order/order/audit?id=${id}`,
    method: 'post'
  })
}
