import Mock from 'mockjs'

const Organization = Mock.mock({
  'data|10': [{
    'department': '@ctitle',
    'id|+10': 1,
    'member|5': [{
      'id': '@id',
      'username': '@name',
      'cname': '@cname'
    }]
  }]
})

export { Organization }
