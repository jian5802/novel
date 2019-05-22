const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  let d = req.body;
  let sql = 'select * from user where state = 1 and name = ?';
  conn.query(sql, d.name, (err, result) => {
    if(err) {
      res.json({
        r: 'db_err'
      });
      return;
    }
    // 账号不存在
    if(!result.length) {
      res.json({
        r: 'u_not'
      });
      return;
    }
    // 判断密码是否正确
    if(md5(d.password) != result[0].password) {
      res.json({
        r: 'p_err'
      });
      return;
    }
    //更新状态
    let sql = 'UPDATE user SET time = ? WHERE id = ?';
    conn.query(sql, [new Date().toLocaleString(), result[0].id], (err, result) => {
       if(err){
         res.json({
         	r: 'db_err'
       	 });
       	return;
       }
    });
    return	res.json({
         r: 'ok',
         user: result[0]
    });
  })
});
module.exports = router;