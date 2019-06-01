const express = require('express');
let multer = require('../admin.js');
const router = express.Router();

router.post('/head', multer.single('file'), (req, res) => {
  res.json({
    success: true,
    file: req.file
  })
})

router.post('/modify', (req, res) => {
  let d = req.body;
  console.log(d);
  let sql = `update admin set name = ?, password = ?, introduce = ?,
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
router.post('/select', (req, res) => {
  let d = req.body;
  let sql = 'select * from admin where id = ?';
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
      admin: result[0]
    })
  });
});
module.exports = router;