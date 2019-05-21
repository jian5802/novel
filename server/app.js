const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require('path');
const session = require("express-session");
const cookieParser = require("cookie-parser");
global.md5 = require("md5");

const app = express();

// 配置请求头
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

let secret = 'sports.app.myweb.www';
// 启用中间件
app.use(cookieParser(secret));
app.use(bodyParser.urlencoded({extended:true}));

//启用session
app.use(session({
    secret:secret,
    resave:true,
    saveUninitialized: true,
    cookie: {maxAge:30*24*3600*1000}
}));


// 数据库连接
global.conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'jian5802',
    port: 3306,
    database: 'dj'
});
conn.connect();

// 配置子路由
app.use("/admin/login", require("./modul/admin/login"));
app.use("/admin/novel", require("./modul/admin/novel"));
app.use("/admin/self", require("./modul/admin/self"));
app.use("/admin/user", require("./modul/admin/user"));
// 静态资源托管
app.use(express.static(path.join(__dirname, 'static')));
app.listen(88, () => {
    console.log('服务器地址:http://localhost:88');
});