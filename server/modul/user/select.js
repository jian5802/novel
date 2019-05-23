const express = require('express');
const router = express.Router();

// 查询本周推荐
router.post('/recommend', (req, res) => {
  let d = req.body;
  let sql = 'select * from user where id = ?';
  conn.query(sql, d.id, (err, result) => {
    if(err){
      res.json({
        success: false,
        message: '数据库错误'
      })
      return;
    }
    return res.json({
      success: true,
      user: result[0]
    })
  })
});
module.exports = router;