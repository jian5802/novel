const express = require('express');
const router = express.Router();

router.post('/first', (req, res) => {
  let d = req.body;
  let sql;
  if(d.kind == 'all') {
    sql = `select * from book where state = 1 and finish = 1 limit ${d.num}`;
  } else {
    sql = `select * from book where finish = 1 and state = 1 and kind = '${d.kind}' limit ${d.num}`;
  }
  let kindNum;
  let sqlNum = 'SELECT kind, COUNT(kind) AS num FROM book WHERE state = 1 GROUP BY kind';
  conn.query(sqlNum, (err, result) => {
    if(err){
      res.json({
        success: false,
        message: '数据库错误'
      })
      return;
    } else {
      kindNum = result
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
          recommend: result,
          kindNum: kindNum
        })
      });
    }
  })
});
router.post('/list/search', (req, res) => {
  let d = req.body;
  let total;
  let start = d.pageSize * (d.pageNum - 1);
  let sqlNum = `select * from book where state = 1 and name like '%${d.book}%' or state = 1 and author like '%${d.book}%'`;
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
  let sql = `select * from book where state = 1 and name like '%${d.book}%' 
  or state = 1 and author like '%${d.book}%' limit ${start}, ${d.pageSize}`;
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
router.post('/search/week', (req, res) => {
  let d = req.body;
  let sql;
  if(d.kind == 'all') {
    sql = `select * from book where state = 1 and finish = 1 limit ${d.start}, ${d.num}`;
  } else {
    sql = `select * from book where finish = 1 and state = 1 and kind = '${d.kind}' limit ${d.start}, ${d.num}`;
  }
  conn.query(sql, (err, result) => {
    if(err){
      return res.json({
        success: false,
        message: '数据库错误'
      })
    }
    return res.json({
      success: true,
      recommend: result
    })
  });
});
router.post('/new', (req, res) => {
  let d = req.body;
  let sql;
  if(d.kind == 'all') {
    sql = `select * from book where state = 1 and finish = 0 limit ${d.start}, ${d.num}`;
  } else {
    sql = `select * from book where finish = 0 and state = 1 and kind = '${d.kind}' limit ${d.start}, ${d.num}`;
  }
  conn.query(sql, (err, result) => {
    if(err){
      return res.json({
        success: false,
        message: '数据库错误'
      })
    }
    return res.json({
      success: true,
      new: result
    })
  });
});
router.post('/id', (req, res) => {
  let d = req.body;
  let sql = `select * from book where state = 1 and id = '${d.id}'`;
  conn.query(sql, (err, result) => {
    if(err){
      return res.json({
        success: false,
        message: '数据库错误'
      })
    }
    return res.json({
      success: true,
      novel: result[0]
    })
  });
});
module.exports = router;