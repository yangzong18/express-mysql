const express = require('express')
const app = express()
const db = require('./models/index')
// CORS模块，处理web端跨域问题
const cors = require('cors')
app.use(cors())

app.get('/', function (req, res) {
    res.send('Birds home page');
});
app.get('/api/getuser', (req, res, next) => {
    db.User.findAll({
    }).then(result => {
        return res.json({
            code: 200,
            data: result,
            affextedRows: result.affextedRows
        })
    }).catch(error => {
        console.log(error)
    })
})
app.get('/api/getuser/email', (req, res, next) => {
    console.log(req.query)
    db.User.findOne({
        where: {
            email: req.query.email
        }
    }).then(result => {
        return res.json({
            code: 200,
            data: result,
            affextedRows: result.affextedRows
        })
    }).catch(error => {
        console.log(error)
    })
})
//启动服务，端口3001
app.listen(3001, () => {
    console.log('服务启动成功:' + `http://localhost:3001/`)
})