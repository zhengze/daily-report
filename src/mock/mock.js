import Mock from 'mockjs'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {LoginUsers, Users} from './data/User.js'
import { MyReports, MyReportsListModel, UserReports, UserReportsListModel } from './data/Report.js'
import { Organization } from './data/Organize.js'

var mock = new MockAdapter(axios)

mock.onGet('/success').reply(200, {
  msg: 'success'
})

mock.onGet('/error').reply(500, {
  msg: 'error'
})

mock.onPost('/login').reply(config => {
  let {username, password} = JSON.parse(config.data)
  return new Promise((resolve, reject) => {
    let user = LoginUsers
    setTimeout(() => {
      let hasUser = LoginUsers.some(u => {
        if (u.username === username && u.password === password) {
          user = JSON.parse(JSON.stringify(u))
          user.password = undefined
          return true
        }
      })
      if (hasUser) {
        resolve([200, { code: 200, msg: '请求成功', user }])
      } else {
        resolve([200, { code: 500, msg: '账号或密码错误' }])
      }
    }, 1000)
  })
})

mock.onGet('/myreport/list').reply(config => {
  let {uid, currentPage, pageSize} = JSON.parse(config.params)
  let myreports_list = MyReportsListModel
  let pageNum = Math.ceil((MyReports.data.length) / pageSize)
  myreports_list.hasNext = currentPage < pageNum
  if (myreports_list.hasNext) {
    myreports_list.data = MyReports.data.slice((currentPage - 1) * pageSize, (currentPage) * pageSize)
  } else {
    myreports_list.data = MyReports.data.slice((currentPage - 1) * pageSize)
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([200, {myreports_list: myreports_list}])
    }, 1000)
  })
})

mock.onGet('/report/list').reply(config => {
  let {uid, currentPage, pageSize} = JSON.parse(config.params)
  let reportsList = UserReportsListModel
  let pageNum = Math.ceil((UserReports.data.length) / pageSize)
  reportsList.hasNext = currentPage < pageNum
  if (reportsList.hasNext) {
    reportsList.data = UserReports.data.slice((currentPage - 1) * pageSize, (currentPage) * pageSize)
  } else {
    reportsList.data = UserReports.data.slice((currentPage - 1) * pageSize)
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([200, {reportsList: reportsList}])
    }, 1000)
  })
})

mock.onGet('/organization').reply(reply => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([200, {organization: Organization}])
    }, 1000)
  })
})
