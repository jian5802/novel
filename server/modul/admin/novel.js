const express = require('express');
const multer = require('../novel.js');
const router = express.Router();

// 查询小说列表
router.post('/list', (req, res) => {
  let d = req.body;
  let total;
  let start = d.pageSize * (d.pageNum - 1);
  let sqlNum = `select * from book where state = 1`;
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
  let sql = `select * from book where state = 1 limit ${start}, ${d.pageSize}`;
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
      novelList: result,
      total: total
    })
  });
});

// 删除小说
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
  let sql = `update book set state = 0 where id in ${ids}`;
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
// 搜索小说
router.post('/search', (req, res) => {
  let d = req.body;
  let total;
  let start = d.pageSize * (d.pageNum - 1);
  let sqlNum = `SELECT * FROM book WHERE NAME LIKE '%${d.name}%' and author LIKE '%${d.author}%'`;
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
  let sql = `SELECT * FROM book WHERE NAME LIKE '%${d.name}%' and author LIKE '%${d.author}%' limit ${start}, ${d.pageSize}`;
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
      novelList: result,
      total: total
    })
  });
});
// 小说类型
router.post('/kind', (req, res) => {
  let d = req.body;
  let total;
  let start = d.pageSize * (d.pageNum - 1);
  let sqlNum = `SELECT * FROM book WHERE kind = ?`;
  conn.query(sqlNum, d.kind, (err, result) => {
    if(err){
      res.json({
        success: false,
        message: '数据库错误'
      })
      return;
    }
    total = result.length;
  });
  let sql = `SELECT * FROM book WHERE kind = ? limit ${start}, ${d.pageSize}`;
  conn.query(sql, d.kind, (err, result) => {
    if(err){
      res.json({
        success: false,
        message: '数据库错误'
      })
      return;
    }
    return res.json({
      success: true,
      novelList: result,
      total: total
    })
  });
});
// 小说封面上传
router.post('/head', multer.single('file'), (req, res) => {
  res.json({
    success: true,
    file: req.file
  });
});
// 添加小说
router.post('/add', (req, res) => {
  let d = req.body.book;
  let sql = `insert into book (name, author, kind, introduce, cover, state, wordNum, readNum)
    values (?, ?, ?, ?, ?, ?, ?, ?)`;
  conn.query(sql, [d.name, d.author, d.kind, d.introduce, d.cover, 1, d.wordNum, d.readNum], (err, result) => {
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
  novelNum ++;
});
// 修改小说
router.post('/modify', (req, res) => {
  let d = req.body;
  let sql = `update book set name = ?, author = ?, kind = ?, introduce = ?, 
    cover = ?, wordNum = ?, readNum = ? where id = ?`;
  conn.query(sql, [d.name, d.author, d.kind, d.introduce, d.cover, d.wordNum, d.readNum, d.id], (err, result) => {
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
// 添加章节
router.post('/catalog', (req, res) => {
  let d = req.body;
  let time = new Date().toLocaleString();
  let sql = `insert into catalog (bookId, name, content, wordNum, time) values (?, ?, ?, ?, ?)`
  conn.query(sql, [d.bookId, d.name, d.content, d.wordNum, time], (err, result) => {
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