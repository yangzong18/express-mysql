const mysql = require('mysql')

const connectdb = () => {
    let connection = mysql.createConnection({
        host: '127.0.0.1',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'cn_opencart'
    })
    return connection;
}

module.exports = connectdb;