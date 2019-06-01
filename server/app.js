const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const path = require('path');
const session = require("express-session");
const cookieParser = require("cookie-parser");
global.md5 = require("md5");

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

let secret = 'sports.app.myweb.www';
app.use(session({
    secret:secret,
    resave:true,
    saveUninitialized: true,
    cookie: {maxAge:30*24*3600*1000}
}));

app.use(cookieParser(secret));
app.use(bodyParser.urlencoded({extended:true}));

global.conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'jian5802',
    port: 3306,
    database: 'dj'
});
conn.connect();

app.use("/admin/login", require("./modul/admin/login"));
app.use("/admin/novel", require("./modul/admin/novel"));
app.use("/admin/self", require("./modul/admin/self"));
app.use("/admin/user", require("./modul/admin/user"));
app.use("/user/login", require("./modul/user/login"));
app.use("/user/novel", require("./modul/user/novel"));
app.use("/user/select", require("./modul/user/select"));
app.use("/user/catalog", require("./modul/user/catalog"));

app.use(express.static(path.join(__dirname, 'static')));
app.listen(88, () => {
    console.log('服务器地址:http://localhost:88');
});