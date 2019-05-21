let multer = require('multer');
let sql = 'select * from book';
global.novelNum = 0;
conn.query(sql, (err, result) => {
  if(err){
    return;
  }
  novelNum = result.length + 1;
})
//文件上传
let storage = multer.diskStorage({
  //file 上传上来的文件的相关信息
  destination: function (req, file, cb) {
    cb(null, `./static/images/book`);
  },
  filename: function (req, file, cb) {
    let filename = novelNum + Math.random().toString().substr(2, 8) + '.' + file.originalname.split('.').pop();
    cb(null, filename);
  }
})
let upload = multer({
  storage: storage
});
module.exports = upload;