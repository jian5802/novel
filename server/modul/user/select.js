const express = require('express');
const router = express.Router();

// 获取当前用户
router.post('/', (req, res) => {
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