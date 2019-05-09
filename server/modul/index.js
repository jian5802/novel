const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.end('成功访问到服务器');
});

router.post('/login', (req, res) => {
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
    // 账号不存在
    if(!result.length) {
      res.json({
        r: 'u_not'
      });
      return;
    }
    // 判断密码是否正确
    console.log(md5(d.password));
    if(md5(d.password) != result[0].password) {
      res.json({
        r: 'p_err'
      });
      return;
    }
    //更新状态
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

// 查询小说列表
router.post('/novel/list', (req, res) => {
  let d = req.body;
  let total;
  console.log(d);
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
router.post('/novel/del', (req, res) => {
  let d = req.body;
  console.log(d);
  let ids = '(';
  for(let i=0; i<d.ids.length; i++){
    if(i == d.ids.length-1){
      ids = ids + d.ids[i] + ')';
    } else {
      ids = ids + d.ids[i] + ',';
    }
  }
  console.log(ids);
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
router.post('/novel/search', (req, res) => {
  let d = req.body;
  console.log(d);
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
router.post('/novel/kind', (req, res) => {
  let d = req.body;
  console.log(d);
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
module.exports = router;