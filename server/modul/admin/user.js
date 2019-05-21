const express = require('express');
const multer = require('../user.js');
const router = express.Router();

// 查询用户列表
router.post('/list', (req, res) => {
  let d = req.body;
  let total;
  let start = d.pageSize * (d.pageNum - 1);
  let sqlNum = `select * from user where state = 1`;
  conn.query(sqlNum, (err, result) => {
    if(err){
      res.json({
        success: false,
        message: '数据库错误'
      })
      return;
    }
    total = result.length;
  });
  let sql = `select * from user where state = 1 limit ${start}, ${d.pageSize}`;
  conn.query(sql, (err, result) => {
    if(err){
      res.json({
        success: false,
        message: '数据库错误'
      })
      return;
    }
    return res.json({
      success: true,
      userList: result,
      total: total
    })
  });
});
// 删除用户
router.post('/del', (req, res) => {
  let d = req.body;
  let ids = '(';
  for(let i=0; i<d.ids.length; i++){
    if(i == d.ids.length-1){
      ids = ids + d.ids[i] + ')';
    } else {
      ids = ids + d.ids[i] + ',';
    }
  }
  let sql = `update user set state = 0 where id in ${ids}`;
  conn.query(sql, (err, result) => {
    if(err){
      res.json({
        success: false,
        message: '数据库错误'
      })
      return;
    }
    return res.json({
      success: true,
    })
  });
});
// 搜索用户
router.post('/search', (req, res) => {
  let d = req.body;
  let total;
  let start = d.pageSize * (d.pageNum - 1);
  let sqlNum = `SELECT * FROM user WHERE NAME LIKE '%${d.name}%'`;
  conn.query(sqlNum, (err, result) => {
    if(err){
      res.json({
        success: false,
        message: '数据库错误'
      })
      return;
    }
    total = result.length;
  });
  let sql = `SELECT * FROM user WHERE NAME LIKE '%${d.name}%' limit ${start}, ${d.pageSize}`;
  conn.query(sql, (err, result) => {
    if(err){
      res.json({
        success: false,
        message: '数据库错误'
      })
      return;
    }
    return res.json({
      success: true,
      userList: result,
      total: total
    })
  });
});
// 用户头像上传
router.post('/head', multer.single('file'), (req, res) => {
  res.json({
    success: true,
    file: req.file
  });
});
// 修改用户信息
router.post('/modify', (req, res) => {
  let d = req.body;
  console.log(d);
  let sql = `update user set name = ?, password = ?, introduce = ?,
    time = ?, head = ?, sex = ?, phone = ? where id = ?`;
  conn.query(sql, [d.name, md5(d.password), d.introduce, new Date().toLocaleString(), d.head, d.sex, d.phone, d.id], (err, result) => {
    if(err){
      res.json({
        success: false,
        message: '数据库错误'
      })
      return;
    }
    return res.json({
      success: true
    })
  });
});
module.exports = router;