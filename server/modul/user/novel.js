const express = require('express');
const router = express.Router();

// 查询本周推荐
router.post('/recommend', (req, res) => {
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
module.exports = router;