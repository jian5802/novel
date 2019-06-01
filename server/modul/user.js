let multer = require('multer');
let sql = 'select * from user';
global.userNum = 0;
conn.query(sql, (err, result) => {
  if(err){
    return;
  }
  userNum = result.length + 1;
})
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./static/images/user`);
  },
  filename: function (req, file, cb) {
    let filename = userNum + Math.random().toString().substr(2, 8) + '.' + file.originalname.split('.').pop();
    cb(null, filename);
  }
})
let upload = multer({
  storage: storage
});
module.exports = upload;