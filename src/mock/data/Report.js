import Mock from 'mockjs'

const MyReports = Mock.mock({
  'data|30': [{
    content: '@cparagraph(1, 3)',
    created_time: '@DATETIME("yyyy-MM-dd HH:mm:ss")'
  }]
})

const MyReportsListModel = Mock.mock({
  'count': MyReports.data.length,
  'data': [],
  'hasNext': true
})

const UserReports = Mock.mock({
  'data|30': [{
    content: '@cparagraph(1, 3)',
    created_time: '@DATETIME("yyyy-MM-dd HH:mm:ss")'
  }]
})

const UserReportsListModel = Mock.mock({
  'count': UserReports.data.length,
  'data': [],
  'hasNext': true
})
export { MyReports, MyReportsListModel, UserReports, UserReportsListModel }
