const express = require('express')
const app = express()
const db = require('./models/index')
// CORS模块，处理web端跨域问题
const cors = require('cors')
app.use(cors())

// 引入json解析中间件
var bodyParser = require('body-parser');
// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 允许所有的请求形式
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

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
app.get('/api/getuser/:email', (req, res, next) => {
    db.User.findOne({
        where: {
            email: req.params.email
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
app.post('/api/adduser', (req, res, next) => {
    console.log(req.params)
})
////////////////////// 所有路由定义完之后，最后做404处理 /////////////////////////////
app.get('*', function (req, res) {
    res.json({
        code: 404,
        message: '接口不存在'
    })
});
//启动服务，端口3001
app.listen(3001, () => {
    console.log('服务启动成功:' + `http://localhost:3001/`)
})