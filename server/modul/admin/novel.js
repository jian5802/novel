const express = require('express');
const multer = require('../novel.js');
const router = express.Router();

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
router.post('/head', multer.single('file'), (req, res) => {
  res.json({
    success: true,
    file: req.file
  });
});
router.post('/add', (req, res) => {
  let d = req.body;
  let sql = `insert into book (name, author, kind, introduce, cover, state, wordNum, readNum, finish)
    values (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  conn.query(sql, [d.name, d.author, d.kind, d.introduce, d.cover, 1, d.wordNum, d.readNum, d.finish], (err, result) => {
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
router.post('/modify', (req, res) => {
  let d = req.body;
  let sql = `update book set name = ?, author = ?, kind = ?, introduce = ?, 
    cover = ?, wordNum = ?, readNum = ?, finish = ? where id = ?`;
  conn.query(sql, [d.name, d.author, d.kind, d.introduce, d.cover, d.wordNum, d.readNum, d.finish, d.id], (err, result) => {
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