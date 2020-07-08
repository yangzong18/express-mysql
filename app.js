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
        })
    }).catch(error => {
        next(error)
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
        })
    }).catch(error => {
        next(error)
    })
})
app.post('/api/adduser', (req, res, next) => {
    db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    }).then(result => {
        return res.json({
            code: 200,
            data: result,
        })
    }).catch(error => {
        next(error)
    })
})
// 404处理中间件，对express来说，404不是error
function handleNotFoundMidWare(req, res, next) {
    res.json({
        message: 'api不存在'
    })
}
// 自定义一个处理异常的中间件
function handleErrMidWare(err, req, res, next) {
    if (err) {
        let { message } = err;
        res.status(500).json({
            message
        })
    }
}
// 404和异常处理的中间件放到最后面
app.use(handleNotFoundMidWare);
app.use(handleErrMidWare);
//启动服务，端口3001
app.listen(3001, () => {
    console.log('服务启动成功:' + `http://localhost:3001/`)
})