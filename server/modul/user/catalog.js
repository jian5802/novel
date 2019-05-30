const express = require('express');
const router = express.Router();

//查询章节
router.post('/list', (req, res) => {
  let d = req.body;
  let sql = `select * from catalog where state = 1 and bookId = '${d.bookId}'`;
  conn.query(sql, (err, result) => {
    if(err){
      return res.json({
        success: false,
        message: '数据库错误'
      })
    }
    return res.json({
      success: true,
      catalogList: result
    })
  })
})
// 查询详情
router.post('/detail', (req, res) => {
  let d = req.body;
  let sqlCatalog = `select * from catalog where state = 1 and id ='${d.id}'`;
  let sql;
  let catalog;
  let novel;
  conn.query(sqlCatalog, (err, result) => {
    if(err){
      return res.json({
        success: false,
        message: '数据库错误'
      })
    } else {
      catalog = result[0];
      sql = `select * from book where state = 1 and id = '${catalog.bookId}'`;
      conn.query(sql, (err, result) => {
        if(err){
          return res.json({
            success: false,
            message: '数据库错误'
          })
        }
        novel = result[0];
        return res.json({
          success: true,
          catalog: catalog,
          novel: novel
        })
      })
    }
  })
})
module.exports = router;