import Mock from 'mockjs'

const MyReports = []

for (let i = 0; i < 30; i++) {
  MyReports.push(Mock.mock({
    content: Mock.Random.cparagraph(1, 3),
    created_time: Mock.Random.date()
  }))
}

export { MyReports }
