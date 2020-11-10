const express = require('express')
const app = express()

// 模拟用户表
const users = {
  zhangsan: {
    password: '123',
    session: '',
    savings: 10000
  },
  lisi: {
    parssowrd: '123',
    session: '',
    savings: 10000
  }
}

app.get('/login', (req, res) => {
  if (
    users[req.query.username] &&
    req.query.password === users[req.query.username].password
  ) {
    const token = Math.random().toString(16).substring(2)
    res.cookie('userToken', token)
    users[req.query.username].session = token
    res.json({
      code: 0,
      data: '登陆成功'
    })
  } else {
    res.statusCode = 401
    res.json({
      msg: '未找到用户'
    })
  }
  res.end()
})

app.listen(8080, () => {
  console.log('server started at localhost: 8080')
})
