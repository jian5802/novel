const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  let d = req.body;
  let sql = 'select * from admin where state = 1 and name = ?';
  conn.query(sql, d.name, (err, result) => {
    if(err) {
      res.json({
        r: 'db_err'
      });
      return;
    }
    console.log(result)
    if(!result.length) {
      res.json({
        r: 'u_not'
      });
      return;
    }
    console.log(md5(d.password));
    if(md5(d.password) != result[0].password) {
      res.json({
        r: 'p_err'
      });
      return;
    }
    let sql = 'UPDATE admin SET time = ? WHERE id = ?';
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
         admin: result[0]
    });
  })
});
module.exports = router;