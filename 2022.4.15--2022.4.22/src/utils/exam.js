// 合并后台发送过来的试卷表和此试卷对应的学生信息
// 后台发送过来了两个数组对象，要根据其中的学生id将两个数组对象合并为一个
export function mergePaperInfo(arr1, arr2) {
  const r = []
  arr1.forEach(item => {
    arr2.forEach(value => item.student_id === value.id && r.push({ ...item, ...value }))
  })
  return r
}
