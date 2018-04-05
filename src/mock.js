const Mock = require('mockjs')

const userData = function () {
  let data = Mock.mock({
    'msg': 'sucess',
    'code': 200,
    'user': 1
  })
  return data
}

Mock.mock('/login', userData)
