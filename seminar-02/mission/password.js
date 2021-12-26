const crypto = require("crypto");
const fs = require("fs");

// 파일 읽기
const password = fs.readFileSync('password.txt');
// 암호화
const base64 = crypto.createHash("sha512").update(password).digest("base64");

console.log("base64: ", base64);

fs.writeFile(`hashed.txt`, base64, (err, base64) => {
    if (err) return console.log(err.message);
    console.log(`hasged.txt 작성 완료`);
  });