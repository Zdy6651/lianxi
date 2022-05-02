import request from '@/utils/request'

export function get_users() {
  return request({
    url: '/user/get_users',
    method: 'get'
  })
}

export function create_user(data) {
  return request({
    url: '/user/create_user',
    method: 'post',
    data
  })
}

export function delete_user(id) {
  return request({
    url: `/user/del_user/${id}`,
    method: 'delete'
  })
}

export function update_user(id, data) {
  return request({
    url: `/user/update_user/${id}`,
    method: 'put',
    data
  })
}
