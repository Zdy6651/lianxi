import request from '@/utils/request'
import qs from 'qs'

export function getBianxi() {
  return request({
    url: '/test/list',
    method: 'get'
  })
}

export function getTeacherExam() {
  return request({
    url: '/teacher/exam-list',
    method: 'get'
  })
}

export function getTeacherExamTest() {
  return request({
    url: '/teacher/test-exam-list',
    method: 'get'
  })
}

export function commitSorce(data) {
  return request({
    url: '/teacher/test-commit-sorce',
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    data: qs.stringify(data)

  })
}
