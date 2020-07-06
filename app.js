const express = require('express')
const app = express()
// CORS模块，处理web端跨域问题
const cors = require('cors')
app.use(cors())

//body-parser 解析表单
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Birds home page');
});
app.post('/', function (req, res) {
    res.send('This is a post data');
});
//使用mysql中间件连接MySQL数据库
const mysql = require('mysql')
const connection = mysql.createConnection({
    host: 'localhost',           //数据库地址
    user: 'root',               //用户名
    password: '123456',           //密码
    port: '3306',              //端口
    database: 'cn_opencart',           //库名
    multipleStatements: true     //允许执行多条语句
})


// 查询
app.get('/api/getuser', (req, res, next) => {
    const sql = 'SELECT * FROM oc_user' //user为表名
    connection.query(sql, (err, results) => {
        if (err) {
            return res.json({
                code: 1,
                message: '用户不存在',
                affextedRows: 0
            })
        }
        res.json({
            code: 200,
            data: results,
            affextedRows: results.affextedRows
        })
    })
})
app.get('/api/product_list', (req, res, next) => {
    const sql = "SELECT * FROM oc_product"
    connection.query(sql, (err, result) => {
        if (err) {
            return res.json({
                code: 1,
                message: '商品不存在',
                affextedRows: 0
            })
        }
        res.json({
            code: 0,
            data: result,
            affextedRows: result.affextedRows
        })
    })
})


//启动服务，端口3001
app.listen(3001, () => {
    console.log('服务启动成功:' + `http://localhost:3001/`)
})