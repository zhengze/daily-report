import Mock from 'mockjs'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {LoginUser, Users} from './data/User.js'

var mock = new MockAdapter(axios)
mock.onPost('/login').reply(config => {
  let {username, password} = JSON.parse(config.data)
  return new Promise((resolve, reject) => {
    let user = null
    setTimeout(() => {
      /*
      let hasUser = Users.some(u => {
        if (u.username === username && u.password === password) {
          user = JSON.parse(JSON.stringify(u))
          user.password = undefined
          return true
        }
      })*/
      const hasUser = true;

      if (hasUser) {
        resolve([200, { code: 200, msg: '请求成功', user }])
      } else {
        resolve([200, { code: 500, msg: '账号或密码错误' }])
      }
    }, 1000)
  })
})
