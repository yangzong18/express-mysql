const db = require('./models/index');
console.log(db)



//定义我们的User 表

var User = dbStroage.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
})

//如果是第一次运行的话,需要用sync 方法创建表
dbStroage.sync()
    .success(function () {
        //用sequelize创建我们第一个用户
        User.create({
            username: 'youxiachai',
            password: '123456'
        }).done(function (err, result) {
            console.log(err)
            console.log(result)
        })
    })
    .error(function (err) {
        console.log(err);

    })